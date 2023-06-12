import React, { useState, useEffect} from "react";
import { getAvatar } from "./Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pong from "@SRC_DIR/assets/images/pong.png";

const ActiveChallenges = ({userInfo}) => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        
        },[leaders]);
    
    return (
    <div className="w-full md:w-3/6 h-fit bg-[#1E1E1E] border-[#393939] m-1 border-solid border p-8 rounded text-center">
      <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Leader Board</h2>
      <hr />
      <br />
       {/* {matches?.length === 0 ? (  */}
        <p className="text-2xl mb-2 font-bold">No data</p>
      {/* //  ) : (
      //   matches?.map(match => (
      //     <div key={match.id} className="flex items-center">
      //       <img src={match.avatar} alt={match.username} className="w-8 h-8 rounded-full mr-2"/>
      //       <span className="mr-2">{match.username}</span>
      //       <span>{match.score}</span>
      //     </div>
      //   ))
      // )} */}
    </div>);
     
}

export default ActiveChallenges;
