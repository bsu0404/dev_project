const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  //좋아요 추가
  const { id: liked_book_id } = req.params;
  const { user_id } = req.body;

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES(?,?);";
  let values = [user_id, liked_book_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};
const subLike = (req, res) => {
  const { id: liked_book_id } = req.params;
  const { user_id } = req.body;

  let sql = "DELETE FROM likes WHERE user_id=? AND liked_book_id = ?";
  let values = [user_id, liked_book_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};
module.exports = { addLike, subLike };
