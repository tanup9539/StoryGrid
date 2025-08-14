
const express=require('express')
const router=express.Router();
const Post=require('../model/Post')



//Routers
router.get('',async (req,res)=>{
    try{
        const locals={
            title:"NodeJs Blog",
            description:"SimpleBlog created with NodeJs,Express & MongoDb."
        }
        let perPage=10;
        let page=parseInt(req.query.page) || 1;

        const data = await Post.aggregate([{ $sort: { createdAt : -1}}])
        .skip(perPage*page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page)+1;
        const hasNextPage = nextPage<=Math.ceil(count/ perPage);



        res.render('index',{
            locals, 
            data,
            current:page,
            nextPage:hasNextPage? nextPage : null,
            currentRoute:'/'
        })
    }catch(error){
        console.log(error);
    }
})

/* 
GET /
HOME
*/

// router.get('|', async (req,res)=>{
//     const locals={
//         title:"NodeJs Blog",
//         descriptions: "Simple Blog created with NodeJs, Express & MongoDb."
//     }

//     try{
//         const data=await Post.find();
//         res.render('index', {locals,data});
//     }catch(error){
//         console.log(error);
//     }
// })


/* GET/ 
Post :id  */

router.get('/post/:id',async (req,res)=>{
    try{
        let slug=req.params.id;  
        const data= await Post.findById({_id:slug});          
        const locals={
            title:"NodeJs Blog",
            description:"SimpleBlog created with NodeJs,Express & MongoDb."
        }

        
        res.render('post',{
            locals,
            data,currentRoute: `/post/${slug}`
        })
    }catch(error){
        console.log(error);
    }
})



/* POST/ 
Post :searchTerm  */

router.post('/search',async (req,res)=>{
    try{         
        const locals={
            title:"Search",
            description:"SimpleBlog created with NodeJs,Express & MongoDb."
        }
        let searchTerm=req.body.searchTerm;
        const searchNoSpecialChar=searchTerm.replace(/[^a-zA-Z0-9 ]/g,"");
        const data=await Post.find({
            $or : [
                {title : { $regex : new RegExp(searchNoSpecialChar, 'i')}},
                {body : { $regex : new RegExp(searchNoSpecialChar, 'i')}},
            ]
        });
        res.render("search",{
            data,locals, currentRoute: '/'
        })
    }catch(error){
        console.log(error);
    }
})


router.get('/about',(req,res)=>{
    res.render('about',{
        currentRoute:'/about'
    })
})
router.get('/contact',(req,res)=>{
    res.render('contact',{
        currentRoute:'/contact'
    })
})

async function insertPostData(){
    await Post.deleteMany({});
    await Post.insertMany([
          {
    title: "The Lighthouse Keeper’s Promise",
    body: `Every night, Elias climbed the spiraling stairs of the old lighthouse, lighting the beacon that guided ships through the treacherous coast. He had done so for forty years without fail. On his last night before retirement, a storm unlike any he’d seen tore across the sea. Through the rain, he saw a faint light blinking back—a vessel in distress. As he worked the beacon harder than ever, he realized it was the same ship he had once been rescued from as a young man.  
      
Posted by Margaret Lee`
  },
  {
    title: "The Vanishing Violin",
    body: `At the grand concert hall, Lucia’s violin solo enchanted the audience, each note painting colors in the air. But as she drew her bow for the final note, the instrument in her hands faded into nothing. The audience applauded wildly, thinking it was part of the performance, but Lucia knew the truth—the violin had belonged to her late teacher, who had told her, “When you’re ready to play without me, I’ll know.”  
      
Posted by Daniel Moore`
  },
  {
    title: "The Letter That Arrived Late",
    body: `James found the envelope in his mailbox, yellowed with age, addressed to him but dated thirty years ago. Inside was a heartfelt apology from his childhood friend, explaining why she’d disappeared from his life. He searched for her online, only to discover she had passed away just a week earlier. That night, he dreamed of her standing at his door, smiling, and handing him the letter in person.  
      
Posted by Claire Bennett`
  },
  {
    title: "Footsteps in the Snow",
    body: `Mara woke to the sound of crunching snow outside her cabin. She peeked out to see a single line of footprints leading into the forest—but none leading out. Wrapping herself in a coat, she followed them under the pale moonlight. Deep in the woods, they stopped at a tree marked with a carved heart and her initials. She had never been there before, yet somehow it felt like home.  
      
Posted by Oliver Grant`
  },
  {
    title: "The Painter of Forgotten Faces",
    body: `In a quiet village, a reclusive artist painted portraits of people no one recognized. When asked, he would only say, “They’re the ones who should be remembered.” One day, a traveler recognized a face in the window—it was her brother, missing for ten years. The artist smiled sadly, and for the first time, left a canvas unfinished.  
      
Posted by Isabel Crane`
  },
  {
    title: "The Train That Didn’t Stop",
    body: `On a foggy evening, Nolan waited for the 8:15 train. Right on time, it appeared out of the mist, but as it passed, it didn’t slow down—it wasn’t stopping at any station. In the windows, passengers stared blankly ahead, dressed in clothing from decades past. He swore he saw his grandfather among them, tipping his hat before the train vanished into the fog again.  
      
Posted by Victor Hayes`
  },
  {
    title: "The Orchard at the Edge of Time",
    body: `Sophie stumbled upon an orchard while hiking, its apples glowing faintly in the sunlight. She picked one and took a bite, only to find herself standing in the same orchard—but fifty years in the past. A man approached, startled, and whispered, “You’re my granddaughter.” When she blinked, she was back in the present, the apple core in her hand.  
      
Posted by Eleanor Price`
  },
  {
    title: "The Book That Wrote Back",
    body: `Working late in the library, Darren found a dusty notebook on a high shelf. Inside, the pages were blank—until he wrote a single line. The next morning, there was a reply in different handwriting. Over weeks, the mysterious writer told him secrets about his own life that no one else could know. On the final page, the writer left an address. When Darren visited it, he found only his childhood home, long abandoned.  
      
Posted by Hannah Cross`
  },
  {
    title: "The Girl in the Photograph",
    body: `At a flea market, Emily bought a black-and-white photo of a young girl standing in front of a farmhouse. Later that night, she noticed the girl had moved closer to the camera. Each morning, the figure crept forward until, one day, the frame was empty. That night, Emily awoke to the sound of footsteps in her hallway.  
      
Posted by Adrian Wells`
  },
  {
    title: "The Town That Slept for a Year",
    body: `When Liam returned to his hometown after a year abroad, everything looked exactly as he had left it—same people in the streets, same conversations at the café. Then he realized the calendar in the diner still showed the date of his departure. No one remembered the missing year except him. In the distance, the church bell rang thirteen times, and the townsfolk froze mid-step.  
      
Posted by Naomi Reed`
  }
    ])
}
insertPostData();

module.exports=router;

