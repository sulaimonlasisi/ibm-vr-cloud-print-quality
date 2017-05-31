import json
import os
from os.path import join, dirname
from watson_developer_cloud import VisualRecognitionV3
visual_recognition = VisualRecognitionV3(VisualRecognitionV3.latest_version, api_key='8bee4e797b67e1b223f6eba317a37d1eb8a0ee7f')

def createCrossPlatformPath(positive_examples_path, negative_examples_path):
  pos_path_list = positive_examples_path.split('\\')
  pos_examples_path = os.path.join(*pos_path_list)
  neg_path_list = negative_examples_path.split('\\')
  neg_examples_path = os.path.join(*neg_path_list)  
  examples_path_list = [pos_examples_path, neg_examples_path]
  return examples_path_list


def createClassifier(pos_examples_path_1, pos_examples_path_2, neg_examples_path):

  #The main component of this function has been commented out because it was used to create a classifier based on images and is no longer needed to run within this code.
  #It can be uncommented and modified if a new classification needs to be done.
  #Possible error from creating a new classification for a user account might be: Unable to create classifier because one already exists
  #This is because only one custom classifier can be created for trial version (which is what I am using). The old classifier can be deleted at: http://visual-recognition-tooling.mybluemix.net/
  #Then a new one can be created
  print(pos_examples_path_1)
  print(pos_examples_path_2)
  print(neg_examples_path)
  pos_examples_class_name_1 = pos_examples_path_1.rsplit("/",1)[1].split('.',1)[0]
  pos_examples_class_name_2 = pos_examples_path_2.rsplit("/",1)[1].split('.',1)[0]
  neg_examples_class_name = neg_examples_path.rsplit("/",1)[1].split('.',1)[0]
  classifier_id = "9jaDrinks"
  #print(classifier_id)
  #print(negative_examples_class_name)
  #print(positive_examples_class_name)

  
  #with open(join(dirname(__file__), positive_examples_path), 'rb') as positive_examples_class_name, \
  #  open(join(dirname(__file__), negative_examples_path), 'rb') as negative_examples_class_name:
  #  print(json.dumps(visual_recognition.create_classifier(classifier_id, sedans_positive_examples=pos_examples_class_name, negative_examples=neg_examples_class_name), indent=2))



 #with open(join(dirname(__file__), pos_examples_path_1), 'rb') as pos_examples_class_name_1, \
 #  open(join(dirname(__file__), pos_examples_path_2), 'rb') as pos_examples_class_name_2, \
#   open(join(dirname(__file__), neg_examples_path), 'rb') as neg_examples_class_name:
#print(json.dumps(visual_recognition.create_classifier(classifier_id, zobo_positive_examples=pos_examples_class_name_1, kunu_positive_examples=pos_examples_class_name_2, negative_examples=neg_examples_class_name), indent=2))
#createClassifier('C:/Users/sulasisi/Documents/summer_2017_cloud_print_quality_project/ibm_visual_recognition/data/image_test/zobo.zip', 'C:/Users/sulasisi/Documents/summer_2017_cloud_print_quality_project/ibm_visual_recognition/data/image_test/kunu.zip', 'C:/Users/sulasisi/Documents/summer_2017_cloud_print_quality_project/ibm_visual_recognition/data/image_test/other_drinks.zip')




def classifyImage():
  #This function classifies a given image specified as input based on the classifier_id of the custom_classifier
  #Still working on making it classify a .zip collection of images.

  with open(join(dirname(__file__), 'C:/Users/sulasisi/Documents/summer_2017_cloud_print_quality_project/ibm_visual_recognition/data/image_test/9ja_test_z_1.jpg'), 'rb') as drinks:
  #with open(join(dirname(__file__), 'drinks.zip'), 'rb') as drinks:
    print(json.dumps(visual_recognition.classify(images_file=drinks, threshold=0, classifier_ids = "9jaDrinks_1586237633"), indent=2))
  #with open(join(dirname(__file__), image_file), 'rb') as file:
  #  print(url)
  #print(json.dumps(visual_recognition.classify(images_file=file, classifier_ids="9jaDrinks_1927044051", threshold=0), indent=2))
classifyImage()
