// const DB = require('../../db.json');
const fs = require('fs');

//READ from JSON file
function read(){
    let entries = fs.readFileSync('../db.json', 'utf-8');
    entries = JSON.parse(entries);
    return entries;
}

//WRITE instance to the JSON file
function write(obj ){
    function message(){
        console.log("json file has been updated")
    }
    let stringified = JSON.stringify(obj);
    fs.writeFile('../db.json', stringified, 'utf8', message);
}

let entriesData = read();

class Entry { 

    constructor(data){
        this.id = data.id;
        this.entry = data.entry;
        this.date = data.date; 
        this.reaction = [{like: data.reaction['like'] || 0}, {dislike: data.reaction['dislike'] || 0}, {tree: data.reaction['tree'] || 0}]; 
        this.comments = 0;
    }

    static create(data){
        let count = entriesData.length;
        const newEntry = new Entry({id: count, ...data}); 
        entriesData.push(newEntry);
        write(entriesData);
        return newEntry;
    }

    static get all(){
        const allEntries = entriesData.map((entry) => new Entry(entry));
        return allEntries;
    }

    static findById(id){
        try{
            const entry = entriesData.filter((e) => e.id === id)[0];
            console.log(`ID CHECK: ${entry.id}`)
                return entry;
        } catch(err){
            let errorStr = `Entry by ${id} does not exist!`;
            throw new Error(errorStr);
        }
    }

    static addReaction(id, reaction){
        try {
            console.log("entering switch.")
            let entry = Entry.findById(id);
            let count;
            switch(reaction) {
                case 'like': 
                    count = Object.values(entry.reaction[0])
                    count++;
                    entry.reaction[0].like = count++
                    break;
                case 'dislike':
                    count = Object.values(entry.reaction[1])
                    count++;
                    entry.reaction[1].dislike = count++
                    console.log(entry)
                    break
                case 'tree':
                    count = Object.values(entry.reaction[2])
                    count++;
                    entry.reaction[2].tree = count++
                    console.log(entry)
                    break
                default:
                    console.log("error! not a valid reaction");
                    break;
                
            } 
            entriesData[id] = entry
            console.log(entriesData[id])
            write(entriesData)
        }
            catch(error) {
                console.warn()
        }
    }

    //add comment

    //add giphy

   
}

module.exports = Entry;