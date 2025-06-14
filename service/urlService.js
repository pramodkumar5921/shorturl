const express = require('express');
const Url = require('../models/url')
const urlRepo = require('../repository/urlRepository');
const nanoid = express('nanoid');
const {saveUrl,getUrlByShortId,incrementCount} = require('../repository/urlRepository');

function isValidUrl(url){
    console.log("... isValid ...");
    try{
        new URL(url);
        return true;
    }catch(err){
        return false;
    }
}

function generateUniqueId() {
  const now = new Date();

  const year = now.getFullYear();                 
  const month = String(now.getMonth() + 1).padStart(2, '0');  
  const day = String(now.getDate()).padStart(2, '0');        
  const hours = String(now.getHours()).padStart(2, '0');     
  const minutes = String(now.getMinutes()).padStart(2, '0'); 
  const seconds = String(now.getSeconds()).padStart(2, '0'); 
  const millis = String(now.getMilliseconds()).padStart(3, '0'); 
  return `${year}${month}${day}${hours}${minutes}${seconds}${millis}`;
}


async function shortenUrl(originalUrl){
    try{
        if(!originalUrl){
            throw new Error('URL is required');
        }
        
        // Add http:// if protocol is missing
        if(!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')){
            originalUrl = 'http://' + originalUrl;
        }

        if(!isValidUrl(originalUrl)){
            throw new Error('Invalid URL Format');
        }

        // const shortId = nanoid(6);
        const shortId = generateUniqueId();
        const urlDoc = await saveUrl(shortId,originalUrl);
        return urlDoc;
    }catch(error){
        throw new Error('Error creating short URL: '+error.message);
    }
}

async function redirectUrl(shortId){
    try{
        const urlDoc = await getUrlByShortId(shortId);
        if(!urlDoc){
            throw new Error('URL not found');
        }
        console.log(urlDoc);
        await incrementCount(urlDoc);
        return urlDoc.originalUrl;
    }
    catch(error){
        throw new Error('Error redirecting URL:' + error.message);
    }
}

async function shortenUrlHandler(req,res,next){
    try{
        const {url} = req.body;
        if(!url){
            return res.status(400).json({error:"URL is Required"});
        }

        const urlDoc = await shortenUrl(url);
        res.json({
            shortUrl:`http://${req.get('host')}/api/${urlDoc.shortUrl}`
        });
    }catch(err){
        if(err.message.includes('Invalid URL')){
            return res.status(400).json({
                error:err.message
            })
        }
        next(err);
    }
}

module.exports = {
    shortenUrl,
    redirectUrl,
    shortenUrlHandler
};