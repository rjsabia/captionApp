Photo Babbel
=====================

Welcome to Photo Babbel, a web-app designed to test the concept
of using an artificially intelligent deep learning neural net 
to scan and categorize your photos and make them searchable. In 
its current first iteration Photo Babbel is basically a proof of 
concept that allows any user a simple interface that they can 
upload a few photos to and see what a computer see's within them.

![](./public/images/heroimage_captionApp.png?cropResize=300,200)
===============================================================================

Doesn't Facebook and Google photos already do this?
----------------------------------------------------

Well the answer to that is, yes infact they do. However two things
were the driving force behind building this: 

- One was that I was frustrated with having a completely chaotic
Dropbox account with thousands of photos, to which I could never 
find the one I wanted when I wanted.

- Two was, well I wanted to see if a developer within their first
year of coding (me) could build such a thing. Apparently the answer 
is YES! 



Want to try it out
===================

Link to the live site: [Photo Babble](https://shrouded-bastion-13556.herokuapp.com/)


Functionality
==============

As of this version, Photo Babble is a very basic site that can 
show users what an AI network sees when you give it a photo to process.
The neural net behind the curtain that performs all of the auto-magic
is the AWS (Amazon Web Services) Rekognition AI. Once a user uploads 
a photo, the Node.js server sends the photo to an AWS S3 bucket, from 
there a Lambda function is called to initiate the Rekognition scan. Once 
the scan has completed, data labels are returned with a confidence score. 
The user see's the data labels, which have been limited to the top ten based
on filtering the confidence level the AI has in what it is seeing.


What the user sees
-------------------

![](./public/images/userView.png?cropResize=200,100)
===============================================================================


What the server and I see
--------------------------

![](./public/images/serverView.png?cropResize=300,200)
===============================================================================



Technical Specs
===============

Photo Babble was built using a multitude of 
front and backend web technologies to included:

- HTML5
- CSS3
- Javascript
- jQuery
- Node.js
- AWS Rekognition network
- AWS S3 buckets
- AWS Lambda
- Mongoose DB


Future functionality?
===========================
While it is fun now for a user to see a computer tell them what
is in their pictures, I have plans to expand on what Photo Babble can do.
The next evolution for this application is to solidify how a photo can be 
categorized and then searched for using these data labels. The intention is to
assign unique id's to each photo, which then are stored with the photos access
url, and then its data labels within a Mongoose Database.

The purpose of this will be so that this database can be searched through based
on a users key word queries, and have the searches return any images that match 
their search. The key to keeping this simple, fast, and cheap will be to only store 
the direct data for the photo's and not the image itself. Sound easy? Well that part 
is not the trick, the trick will be conect this to the photos themselves based on
a photos access url, and then attemping to integrate this into a service like Dropbox.
Why am I putting all of this out here, well because I would love any idea's and or 
feedback from anyone reading this of course.

Future Improvements?
===========================

Other changes in functionality maybe with authentication and account creation as well
as re-working the front-end. In the time since I first built this I have been working 
with other technologies that have opened up other avenues I did not know about before. 
For example I may convert the entire athentication process over to Google Firebase due 
to its ease of implementation and it simplicity to maintain. This will allow me to devote 
more time to structuring the database for the photo data. I may also convert the front 
end code to REACT, a framework I learned several months ago. In my opinion REACT's amazing 
ability to pass data and scale will allow this application to grow with increasing 
complexity smoothly.

Want to get in touch, share your thoughts, or collaborate?
-----------------------------------------------------------

Jump to my portfolio site and head to the Contact me section: [russellsabia.com](russellsabia.com)




