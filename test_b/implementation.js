'use strict';

const e = require('express');
const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

const candidates = new Array();

function candidatesParamMiddleware(req, res, next) {
    const body = req.body;

    if (!(body && 
        body.id && 
        typeof body.id === 'string' &&
        body.name &&
        typeof body.name === 'string' &&
        body.skills &&
        Array.isArray(body.skills))) {
            res.status(400).send();
        } else {
            next();
        }
}

function searchParamsMiddleware(req, res, next) {
    if(!req.query.skills) {
        res.status(400).send();
    } else {
        next();
    }
}

app.post('/candidates', candidatesParamMiddleware, function(req, res) {
    const body = req.body;

    candidates.push(body);
    res.status(200).send();
});

app.get('/candidates/search', searchParamsMiddleware, function(req, res) {
    const skills = req.query.skills.split(',');
    const found = findBests(skills);

    if (found.length > 0) {
        res.status(200).send(findTheBest(found));
    } else {
            res.status(404).send();
    }
});

function findBests(skills) {
    let found = [];
    let rank = 0;
    
    candidates.forEach(candsidate => {
        let candidateRank = howMany(candsidate.skills, skills);
        if (rank <= candidateRank && candidateRank > 0) {
            found.push(candsidate);
            rank = howMany(candsidate.skills, skills);
        }
    });

    return found;
}

function findTheBest(bests) {
    let fin = {};
    let prvSk = 0;
    
    if(bests.length > 1) {
        bests.forEach(i => {
            if (i.skills.length > prvSk ) {
                fin = i;
            }
        });
        return fin;
    } else {
        return bests[0];
    }
}

function howMany(a1, a2) {
    let c = 0;
    a1.forEach(i1=> {
        a2.forEach(i2 => {
            if (i1 === i2) {
                c = c + 1;
            }
        })
    });

    return c;
}

app.listen(process.env.HTTP_PORT || 3000);
