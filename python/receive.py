#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 28 12:03:30 2019

@author: drone
"""

import socket
import threading
import time
import requests
import json
import os
import sys

host = ""
port = 9000
data_dir = sys.argv[1]
api_url = sys.argv[2]

picture_extension = ['.jpg', '.png', 'jpeg']
video_extension = ['.mov', '.avi', '.mp4']
id_socket = {"mission" : "", "intervention" : ""}
serversock = socket.socket()
serversock.bind((host, port))
serversock.listen(20)
sys.stdout.write("Waiting for files...")
sys.stdout.flush()

def save(client_socket, collection):
    global data_dir
    size = client_socket.recv(16)
    size = int(size, 2)
    file_name = client_socket.recv(size)
    file_size = client_socket.recv(32)
    file_size = int(file_size, 2)
    file_path = data_dir+file_name.decode()
    file_to_write = open(file_path, 'wb')
    chunk_size = 4096
    while file_size > 0:
        if file_size < chunk_size:
            chunk_size = file_size
        data = client_socket.recv(chunk_size)
        file_to_write.write(data)
        file_size -= len(data)
    file_to_write.close()
    time.sleep(0.001)
    f_inter = open(file_path, 'r')
    address = api_url+collection+"/"
    content_json = json.loads(f_inter.read())
    requests.post(address, json = content_json)
    id_socket[collection] = json.loads(requests.get(address, json = content_json).text)[0]['_id']
    new_dir = data_dir+collection+id_socket[collection]+"/"
    if not os.path.exists(new_dir):
        os.system("mkdir "+new_dir)
    else:
        os.system("rm "+str(new_dir+file_name.decode()))
    os.system("mv "+str(file_path)+" "+str(new_dir+file_name.decode()))
    data_dir = new_dir

def reader(client_socket):
    save(client_socket, "intervention")
    save(client_socket, "mission")
    requests.post(api_url+"link_mission_intervention/",
              json = {'intervention_id':str(id_socket["intervention"]), 
                      'mission_id':str(id_socket["mission"])})
    while True:
        size = client_socket.recv(16)
        if not size:
            break
        size = int(size, 2)
        file_name = client_socket.recv(size).decode()
        file_extension = file_name[len(file_name)-4:len(file_name)]
        file_size = client_socket.recv(32)
        file_size = int(file_size, 2)
        file_path = data_dir+file_name
        file_to_write = open(file_path, 'wb')
        chunk_size = 4096
        while file_size > 0:
            if file_size < chunk_size:
                chunk_size = file_size
            data = client_socket.recv(chunk_size)
            file_to_write.write(data)
            file_size -= len(data)
        file_to_write.close()
        sys.stdout.write(file_name+' received successfully')
        sys.stdout.flush()
        if file_extension in picture_extension:
            requests.post(api_url+"frame/", json = {"frame_path" : file_path})
            picture_id = json.loads(requests.get(api_url+"frame/", 
                                                 json = {"frame_path" : file_path}).text)[0]['_id']
            requests.post(api_url+"link_frame_mission/", json = {'frame_id':str(picture_id), 
                      'mission_id':str(id_socket["mission"])})
        elif file_extension in video_extension:
            video_json = {"video_path" : file_path, "video_extension" : file_extension}
            requests.post(api_url+"video/", json = video_json)
            video_id = json.loads(requests.get(api_url+"video/", json = video_json).text)[0]['_id']
            requests.post(api_url+"link_video_mission/", json = {'video_id':str(video_id), 
                      'mission_id':str(id_socket["mission"])})

if __name__ == "__main__":
    while True:
        client, addr = serversock.accept()
        sys.stdout.write("Got a connection from %s" % str(addr))
        sys.stdout.flush()
        client_serve_thread = threading.Thread(target=reader, args=tuple((client,)))
        client_serve_thread.start()
        time.sleep(0.001)
    serversock.close()