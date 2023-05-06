import axios from "axios";
import { useEffect, useState } from "react";
import { commentIcon, shareIcon, userIcon } from "../../../../../assets";
import * as BiIcons from "react-icons/bi";

function ShowComments({ commentArr }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentArr.map(async (comment) => {
      let res = await getUser(comment);
      setComments((prev) => {
        if (prev.some((data) => data._id === comment._id)) {
          return prev;
        } else {
          return [...prev, { ...comment, fullname: res.data.user.fullname }];
        }
      });
    });
  }, [commentArr]);

  const getUser = (comment) => {
    return axios.get(
      `https://konectin-backend-hj09.onrender.com/user/getUser?userId=${comment.userId}`
    );
  };

  const likeComment = (data) => {};

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="flex items-start gap-2 border-b border-neutral-700 pb-4"
        >
          <div className="rounded-full bg-secondary-200 flex items-center justify-center w-8 h-8">
            <img src={userIcon} className="w-4 h-4" alt="You" />
          </div>
          <div className="flex flex-col">
            <hgroup className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold">
                {comment?.fullname.split(" ")[0]}.{" "}
                {comment?.fullname.split(" ")[1].charAt(0)}
              </h3>
              <h6 className="text-[8px] text-neutral-500">4h</h6>
            </hgroup>

            <p className="text-[11px] text-neutral-300">{comment.comment}</p>

            <ul className="text-[9px] text-neutral-500 list-disc flex space-x-4 relative left-4 mt-1">
              <li>
                <span className="relative -left-1">2 replies</span>
              </li>
              <li>
                <span className="relative -left-1">5 shares</span>
              </li>
              <li>
                <span className="relative -left-1">2 likes</span>
              </li>
            </ul>

            <div className="flex text-lg text-primary-500 gap-2 mt-1">
              <img
                className="w-[17px] cursor-pointer"
                src={commentIcon}
                alt="comment"
              />
              <img
                className="w-[17px] cursor-pointer"
                src={shareIcon}
                alt="share"
              />
              <BiIcons.BiLike
                onClick={() => likeComment(comment)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowComments;
