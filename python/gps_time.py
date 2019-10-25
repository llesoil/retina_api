#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 25 12:34:01 2019

@author: drone
"""

import requests

requests.post('http://127.0.0.1:1337/intervention/', json = {"intervention_address" : { "street_number" : "263",
	"street_name" : "Avenue Général Leclerc",
	"postal_code" : "35000",
	"city" : "Rennes",
	"country_code" : "FRA",
	"country" : "France", 
	"lines" : {"line1" : "E218 Office"} },
	"groundbase_location" : { "altitude" : 0.00,
		"latitude" : 48.452670, 
		"longitude" : -1.6406853},
		"drone_arrival_time" : "2019-05-02T16:30:00,000+02:00",
		"intervention_description" : "Fire on the second and third floors, 3 victims saved",
		"first_drone_deployed_time" : "2019-05-02T16:35:00,000+02:00",
		"end_of_intervention_time" : "2019-05-02T17:50:00,000+02:00",
		"intervention_limits" : [{ "altitude" : 0,
			"latitude" : 48.452670, 
			"longitude" : -1.640683},  
			{ "altitude" : 0,
				"latitude" : 48.452120, 
				"longitude" : -1.640684},
				{ "altitude" : 0,
					"latitude" : 48.452610, 
					"longitude" : -1.640685}],
					"intervention_name" : "general_leclerc_may2019",
					"quality" : 2,
					"intervention_start_time" : "2019-05-02T16:30:00,000+02:00",
					"type_of_intervention" : "fire"})

res = requests.get('http://127.0.0.1:1337/intervention/gps_time=48.353179;-1.641688;48.602724;-1.640057;2019-05-02T17:41:00,000+02:00')

print(res.json())
