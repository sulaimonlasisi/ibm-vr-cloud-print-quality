import json
import os
from os.path import join, dirname
from os import environ
from watson_developer_cloud import VisualRecognitionV3 as vr
instance = vr(api_key='8bee4e797b67e1b223f6eba317a37d1eb8a0ee7f', version='2016-05-20')
#img = instance.classify(images_url="young-giraffe.jpg")
img = "https://giraffegenome.science.psu.edu/images/young-giraffe.jpg"
print (img)




print(json.dumps(instance.classify(images_url=img), indent=2))




#for things in img["images"][0]["classifiers"][0]["classes"]:
#  print('\n There is a ' + str(things["score"]*100) + ' percent chance the image contains: '+ things["class"])