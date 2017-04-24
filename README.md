# nps-planner-app

## [Trello Link](https://trello.com/b/u0GiRqeJ/nps-trip-planner-project-2)

## [Link to Wirefram](https://trello.com/b/u0GiRqeJ/nps-trip-planner-project-2)


## APIs Used:
### National Parks Service API
#### [NPS API](https://developer.nps.gov/api/index.htm)

## Description:
#### This app will be used to assist in planning trips to US National Parks. As a starting point, the only searchable parks will be in CO, beginning with Rocky Mountain National Park.

## Ideation: 
###
 1. What am I making?
 ####
 - An app to assist in planning trip to National parks, and potentially (in the future) state parks.
 ###
 2. Why am I making it in the first place?
 ####
 - I want to utilize national/state governed resources to support (what I believe to be) threatened lands, and to also allow people more information on the Parks before arriving. 
 ###
 3. Why would people use it?
 #### 
  - Let's face it, mother nature can be a pain in the ass, and as someone who loves the outdoors, I don't want to show up somewhere only to have it be closed, dangerous, or in horrible condition. Even worse- flooded with other humans. This app will (hopefully) supply information on how crowded the park is, and its current conditions/closures.
### 
4. Who would use it?
#### 
 - I'm aiming for this initial launch to be aimed at the people of Colorado, as they love their hiking and parks. I'm hoping to give something back to the community in the form of useful, pertinent information, and I believe they'll use it. 
###
5. How do I make it the best resource for them?
#### 
 - To answer this question I need to dive into some UX. My main goal is to present a clean, easy to use, and informative app that presents just enough info to people to inspire them to get outside and actually visit the parks they're researching. To do this, I need to figure out WHAT info is important to people - what do they want to know, where do they want to see it, is it up to date? To help people feel connected to the product, I also want to make sure they can store the park info that is important to them, and have that info update to current conditions.

 ## Planned Features
 ####
  - National Park lookup by state (starting with CO) to provide current information direct from the NPS, including current alerts, directions, and MAYBE a map. 
  - User sign up and sign in to store potential trip ideas for future reference. 




## Users should be able to:
#### 

    - Log into their own site profile
    - Sort National Parks by state
    - Select a Park
    - See selected park's important information, including current alerts, closers, etc
    - Save park to "My Parks""




# As of 4/24: 
### Things not finished:
#### - Unable to save parks to "my parks"
- unable to delete a park from "my parks"
- sorting by state
- basically anything that I wanted to do
- styling
- can't sort through heroku log errors
- mobile toggle not connected

## Things that are not going great
#### Other than pretty much everything, the biggest take away here is to solidify more solid RESTFUL routes - the fact that as of right now I don't have even 4 RESTFUl routes is pretty sad. I spent all of today (4/23) trying to rearrange my app at the suggestion of other devs, and ended up just being confused and frustrated due my lack of understandings of the concepts. I'm just finally starting to understand why we need so many files (Until today I had basically everything in my server.js file).





### Park Codes (/parks?parkCode=):
### Rocky Mountain National Park - romo