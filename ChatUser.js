/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');
const axios = require('axios');
/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor
    this.members = null;

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: 'chat',
      text: text
    });
  }

  /** handle a joke: broadcast to room. */

  async handleJoke(text) {
    // set up random joke to pass in to braodcast
    const response = await axios.get('https://icanhazdadjoke.com/slack');
    let jk = response.data.attachments[0].fallback;
    //use this.send to send the data you want to the server and not everyone
    this.send(
      JSON.stringify({
      name: 'Server',
      type: 'chat',
      text: '/joke',
      joke: jk
    })
    );
  }

  /** handle a list of all members: broadcast to room. */

  handleMembers(text) {
    // get at list from Room.members
    let memList = Array.from(this.room.members)
    .map( m => m.name).join(", ");
    this.send(
      JSON.stringify({
      name: 'Server',
      type: 'chat',
      text: '/members',
      members: 'People in chatroom: ' + memList
    })
    );
  }

  /** Handle messages from client:
   *
   * - {type: "join", name: username}  : join
   * - {type: "chat", text: msg }      : chat
   * - {type: "chat", text: /joke }    : joke
   * - {type: "chat", text: /members } : members
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.type === 'chat' && msg.text !== '/joke' && msg.text !== '/members') this.handleChat(msg.text);
    else if (msg.type === 'chat' && msg.text === '/joke') this.handleJoke(msg.joke);
    else if (msg.type === 'chat' && msg.text === '/members') this.handleMembers(msg.members);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
