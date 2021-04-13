/** User class for message.ly */
const db = require("../db");

const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");

const {BCRYPT_WORK_FACTOR} = require("../config");
// const { response } = require("express");

/** User of the site. */
// no constructor needed since different data is being passed to each function

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */
  // Postgres uses now() but current_timestamp is a sql function
  static async register({username, password, first_name, last_name, phone}) { 
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      const result = await  db.query(
        `INSERT INTO users (username, password,
          first_name, last_name, phone,
          join_at, last_login_at)
          VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp) 
          Returning username, password,
          first_name, last_name, phone`,
          [username, hashedPassword, first_name, last_name, phone]);

          return result.rows[0];
  }
    
  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    // table holds hashed pw 
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]);
      const user = result.rows[0];
    // bcrypt.compare returns true or false
      let apw = await bcrypt.compare(password, user.password);
      
      return user && apw;
}

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    const result = await db.query(
      `UPDATE users
       SET last_login_at = current_timestamp 
       WHERE username = $1
       RETURNING username`,
       [username]);
      const update = result.rows[0];
      if (!update) {
        throw new ExpressError(`No such username: ${username}`, 404);
      } 
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const result = await db.query(
      `SELECT username,
       first_name, last_name, phone 
       FROM users
       ORDER BY username`);
      return result.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const result = await db.query(
      `SELECT username, first_name, last_name,
      phone, join_at, last_login_at 
      FROM users WHERE username = $1`,
      [username]);
      const response = result.rows[0];
      if (!response) {
        throw new ExpressError(`No such username: ${username}`, 404);
      } else {
        return response;
      }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const result = await db.query(
      `SELECT messages.id,
       messages.to_username, 
       users.first_name, users.last_name,
       messages.body, users.phone,
       messages.sent_at, messages.read_at
       FROM messages 
       JOIN users ON messages.to_username = users.username
       WHERE from_username = $1`,
       [username]);
      // using mapping method
       return result.rows.map( d => ({
         id: d.id,
         to_user: {
           username: d.to_username,
           first_name: d.first_name,
           last_name: d.last_name,
           phone: d.phone
          }, 
          body: d.body,
          sent_at: d.sent_at,
          read_at: d.read_at
       }));
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const result = await db.query(
      `SELECT messages.id,
       messages.from_username, 
       users.first_name, users.last_name,
       messages.body, users.phone,
       messages.sent_at, messages.read_at
       FROM messages 
       JOIN users ON messages.from_username = users.username
       WHERE to_username = $1`,
       [username]);
      //Why doesn't this method work?
      // let m = result.rows[0];
      //  return {
      //   id: m.id,
      //   from_user: {
      //     username: m.from_username,
      //     first_name: m.first_name,
      //     last_name: m.last_name,
      //     phone: m.phone
      //    }, 
      //    body: m.body,
      //    sent_at: m.sent_at,
      //    read_at: m.read_at
      // };
      return result.rows.map( d => ({
        id: d.id,
        from_user: {
          username: d.from_username,
          first_name: d.first_name,
          last_name: d.last_name,
          phone: d.phone
         }, 
         body: d.body,
         sent_at: d.sent_at,
         read_at: d.read_at
      }));
   }
}


module.exports = User;