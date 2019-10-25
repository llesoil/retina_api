#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 25 12:03:13 2019

@author: drone
"""

import requests

#on poste le waypoint
response_waypoint = requests.post("http://127.0.0.1:1337/waypoint/", json = {"battery_level" : 80.5,
		"waypoint_location" : {"altitude" : 15.321,
			"latitude" : 48.452666, 
			"longitude" : -1.6406852},
			"end_pose_time" : "2019-05-02T17:05:32,854+02:00",
			"quality" : 2,
			"arrival_time" : "2019-05-02T17:05:24,413+02:00",
			"temperature" : 14.3,
			"wind_direction" : 320.4,
			"wind_strength" : 25})

waypoint_id = response_waypoint.json()['_id']
print("L'id du waypoint est " + waypoint_id)


# =============================================================================
# requests.post("http://127.0.0.1:1337/mission/", json = {
#     "free" : [],
#     "was_changed" : False,
#     "comments" : "Third goal far from the original objective",
#     "mission_end_time" : "2019-05-02T17:05:56,000+02:00",
#     "was_finished" : False,
#     "moving_duration" : "P0Y0M0DT0H19M53,254S",
#     "payload_weight" : 2.3,
#     "pilot_name" : "Olivier",
#     "quality" : 2,
#     "scenario" : "S1",
#     "mission_start_time" : "2019-05-02T16:36:52,154+02:00",
#     "type_of_mission" : "building recognition"
# })
# =============================================================================

# en admettant qu'au préalable la mission ait été mise en base avec ces informations
# sinon, décommenter le bloc du dessus
response_mission = requests.get("http://127.0.0.1:1337/mission/", json = {
    "free" : [],
    "was_changed" : False,
    "comments" : "Third goal far from the original objective",
    "mission_end_time" : "2019-05-02T17:05:56,000+02:00",
    "was_finished" : False,
    "moving_duration" : "P0Y0M0DT0H19M53,254S",
    "payload_weight" : 2.3,
    "pilot_name" : "Olivier",
    "quality" : 2,
    "scenario" : "S1",
    "mission_start_time" : "2019-05-02T16:36:52,154+02:00",
    "type_of_mission" : "building recognition"
})

mission_id = response_mission.json()[0]['_id']
print("L'id de la mission est " + mission_id)

# on poste ensuite le lien waypoint-mission avec la commande suivante
requests.post("http://127.0.0.1:1337/link_waypoint_mission/", json = {"waypoint_id" : waypoint_id,
                                                                      "mission_id" : mission_id})

print('Lien entre la mission et la waypoint créé!')
