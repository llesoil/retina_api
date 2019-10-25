# -*- coding: utf-8 -*-
"""
Created on Wed Aug 28 11:45:27 2019

@author: llesoil
"""

import socket
import os
import json
import re

host = "131.254.101.229" # host ip
port = 9000 # default port
path = "C:/Users/llesoil/Documents/drone/api/data" # data directory

intervention_elements = ['free', 'intervention_address', 'groundbase_location', 'drone_arrival_time',
                         'intervention_description', 'first_drone_deployed_time', 
                         'end_of_intervention_time', 'intervention_limits', 'intervention_name', 
                         'quality', 'intervention_start_time', 'type_of_intervention']

intervention_mandatory = ['end_of_intervention_time', 'intervention_name', 'intervention_start_time']

mission_elements = ['free', 'was_changed', 'comments', 'mission_end_time', 'was_finished', 
                    'moving_duration', 'payload_weight', 'pilot_name', 'quality', 
                    'scenario', 'mission_start_time', 'type_of_mission']

mission_mandatory = ['mission_start_time', 'mission_end_time', 'scenario']

date_regex = "^(19[0-9][0-9]|20[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])T(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]),([0-9][0-9][0-9])([+]|[-])[0-2][0-9]:[0-5][0-9]"

picture_extension = ['.jpg', '.png', 'jpeg']
video_extension = ['.mov', '.avi', '.mp4']

directory = os.listdir(path)

def send_file_to_server(file):
    size = len(file)
    if size > 5:
        if file[0:5] !="sent_":
            size = bin(size)[2:].zfill(16) # encode filename size as 16 bit binary
            s.send(size.encode('utf-8'))
            s.send(file.encode('utf-8'))
            filename = os.path.join(path, file)
            filesize = os.path.getsize(filename)
            filesize = bin(filesize)[2:].zfill(32) # encode filesize as 32 bit binary
            s.send(filesize.encode('utf-8'))
            file_to_send = open(filename, 'rb')
            l = file_to_send.read()
            s.sendall(l)
            file_to_send.close()
            print(file+' sent!')
            #if file[len(file)-4:len(file)] != "json":
            #    os.rename(filename,os.path.join(path,"sent_"+file))

def is_valid_date(date):
    return re.search(date_regex, date) != None
    
def is_valid_intervention():
    is_valid = True
    f = open(os.path.join(path, "intervention.json"), 'r')
    inter = json.loads(f.read())
    for el_inter in inter:
        if el_inter not in intervention_elements:
            is_valid = False
    for mandatory_inter in intervention_mandatory:
        if mandatory_inter not in inter:
            is_valid = False
    if not isinstance(inter['intervention_name'], str) or inter['intervention_name'] == "":
        is_valid = False
    if not is_valid_date(inter['intervention_start_time']) or not is_valid_date(inter['end_of_intervention_time']):
        is_valid = False
    if inter["groundbase_location"]['latitude'] == None or inter["groundbase_location"]['longitude'] == None:
        is_valid = False
    return is_valid

def is_valid_mission():
    is_valid = True
    f = open(os.path.join(path, "mission.json"), 'r')
    mission = json.loads(f.read())
    for el_mission in mission:
        if el_mission not in mission_elements:
            is_valid = False
    for mandatory_mission in mission_mandatory:
        if mandatory_mission not in mission:
            is_valid = False
    if re.search("^S[1-4]$", mission['scenario'])==None:
        is_valid = False
    if not is_valid_date(mission['mission_start_time']) or not is_valid_date(mission['mission_end_time']):
        is_valid = False
    return is_valid

if __name__ == "__main__":
    
    s = socket.socket()
    s.connect((host, port))
    
    if "intervention.json" and "mission.json" in directory:
        if is_valid_intervention() and is_valid_mission():
            send_file_to_server("intervention.json")
            send_file_to_server("mission.json")
            
            for file in directory:
                file_extension = file[len(file)-4:len(file)]
                if file_extension in picture_extension or file_extension in video_extension:
                    send_file_to_server(file)
    
    s.close()