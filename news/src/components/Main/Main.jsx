import classes from "./Main.module.css"
import HomeNews from "../HomeNews/HomeNews"
import Account from "../Account/Account";

export default function Main({path}){
  const arrayNews = [
    { imageNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      date: new Date().toDateString(), 
      title: "BIG1 - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ",
      contentNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    { imageNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      date: new Date().toDateString(), 
      title: "MIN1 - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ",
      contentNews: "Lore cupiditate adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    { imageNews: "Lorem, ipsum dolor siti? ", 
      date: new Date().toDateString(), 
      title: "MIN2 - Lorem, ipsum",
      contentNews: "Lorem, adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    { imageNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      date: new Date().toDateString(), 
      title: "MIN3 - Loremate adipisci? ",
      contentNews: "Lorem, ipsum adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    { imageNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      date: new Date().toDateString(), 
      title: "MIN4 - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ",
      contentNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    { imageNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      date: new Date().toDateString(), 
      title: "MIN5 - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ",
      contentNews: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      imageAuthor: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis minima dolores unde veritatis ipsum, sapiente perferendis non quo cupiditate maxime saepe enim repudiandae amet dicta quos! Error accusamus nisi est!Modi nam maiores temporibus officiis ex laboriosam, hic dolorem harum eveniet ab voluptate recusandae sequi, quia praesentium eligendi pariatur necessitatibus quis explicabo incidunt ipsum! Cumque commodi libero fugit cupiditate adipisci? ", 
      nameAuthor: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" 
    },
    
  ];
  
  return (
    <main>
      { 
        path=="homeAll" 
        && (<HomeNews arrayNews={arrayNews}/>)
        || path=="homeApp"
        && (<HomeNews arrayNews={arrayNews}/>)
        || path=="account"
        && (<Account />)
      }
    </main>
  )
};