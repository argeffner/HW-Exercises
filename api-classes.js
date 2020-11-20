const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/**
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /**
   * This method is designed to be called to generate a new StoryList.
   *  It:
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  // TODO: Note the presence of `static` keyword: this indicates that getStories
  // is **not** an instance method. Rather, it is a method that is called on the
  // class directly. Why doesn't it make sense for getStories to be an instance method?

  static async getStories() {
    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/stories`);

    // turn the plain old story objects from the API into instances of the Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    const storyList = new StoryList(stories);
    return storyList;
  }

  /**
   * Method to make a POST request to /stories and add the new story to the list
   * - user - the current instance of User who will post the story
   * - newStory - a new story object for the API with title, author, and url
   *
   * Returns the new story object
   */

  async addStory(user, newStory) {
    // TODO - Implement this functions!
    // this function should return the newly created story so it can be used in
    // the script.js file where it will be appended to the DOM
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/stories`,
      data: {
        story: newStory,
        token: user.loginToken, // loginToken is found in the user class below
      }
    });
    //need to make a new story
    newStory = new Story(response.data.story);
    //story added to top of list
    this.stories.unshift(newStory);
    // and add to user list
    this.ownStories.unshift(newStory);

    return newStory;
  }

  //delete request needs to go in the story class
  async deleteStory(user, storyId) {
    // TODO - Implement this functions!
    // this function should return the newly created story so it can be used in
    // the script.js file where it will be appended to the DOM
    let response = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/stories/${storyId}`,
      data: {
        token: user.loginToken, // loginToken is found in the user class below
      }
    });
   
    //filter out storyId of story that we are removing
    this.stories = this.stories.filter(story => story.storyId !== storyId); 
    // filter out story Id from user list
    this.ownstories = user.ownStories.filter(sto => sto.storyId !== storyId);
  }
}


/**
 * The User class to primarily represent the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
  constructor(userObj) {
    this.username = userObj.username;
    this.name = userObj.name;
    this.createdAt = userObj.createdAt;
    this.updatedAt = userObj.updatedAt;

    // these are all set to defaults, not passed in by the constructor
    this.loginToken = "";
    this.favorites = [];
    this.ownStories = [];
  }

  /* Create and return a new user.
   *
   * Makes POST request to API and returns newly-created user.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async create(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: {
        username,
        password,
        name
      }
    });

    // build a new User instance from the API response
    const newUser = new User(response.data.user);

    // attach the token to the newUser instance for convenience
    newUser.loginToken = response.data.token;

    return newUser;
  }

  /* Login in user and return user instance.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: {
        username,
        password
      }
    });

    if(!response.data || !response.data.user)
      throw new Error ('No user structure being passed')
      
    // build a new User instance from the API response
    const existingUser = new User(response.data.user);

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s));

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = response.data.token;

    return existingUser;
  }

  /** Get user instance for the logged-in-user.
   *
   * This function uses the token & username to make an API request to get details
   *   about the user. Then it creates an instance of user with that info.
   */

  static async getLoggedInUser(token, username) {
    // if we don't have user info, return null
    if (!token || !username) return null;

    // call the API
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      params: {token}
    });

    // instantiate the user from the API information
    const existingUser = new User(response.data.user);

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = token;

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s));
    return existingUser;
  }

  // gets the user info from API (/users/${username}) as a token
  async getDetails(){
    const response = await axios.get(`${BASE_URL}/users/${this.username}`, {
      params: {
        token: this.loginToken
      }
  });

   // need to update all the user properties from API
   this.createdAt = response.data.user.createdAt;
   this.updatedAt = response.data.user.updatedAt;
   this.name = response.data.user.name;

   //now I need to update favorite and ownstories
   this.favorites = response.data.user.favorites.map(s => new Story(s));
   this.ownStories = response.data.user.stories.map(s => new Story(s))
   return this;
 }

  // add a favorite story using the storyId
  addFavorite(storyId) {
   return this.toggleFavorite(storyId, "POST");
 }

  // delete favorite using the storyId
  deleteFavorite(storyId) {
   return this.toggleFavorite(storyId, "DELETE");
 }
 // function for posting or deleteting to the API
  async toggleFavorite(storyId, reqType){
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
      method: reqType,
      data: {
        token: this.loginToken
      }
    });
    await this.getDetails();
    return this;
  }
  //make changes to API (PATCH request) for changing/updating user
  // async update(userData){
  //   const response = await axios({
  //     url: `${BASE_URL}/users/${this.username}`,
  //       method: "PATCH",
  //       data: {
  //         user: userData,
  //         token: this.loginToken
  //       }
  //   });
  //   // update the property "name"
  //   this.name = response.data.user.name;
  //   return this;
  // }

  // delete request to API for removing the user
  async delete() {
    await axios({
      url: `${BASE_URL}/users/${this.username}`,
      method: "DELETE",
      data: {token: this.loginToken}
    }); 
   }
 // can add more option functions to API if I want later
}

/**
 * Class to represent a single story.
 */

class Story {

  /**
   * The constructor is designed to take an object for better readability / flexibility
   * - storyObj: an object that has story properties in it
   */

  constructor(storyObj) {
    this.author = storyObj.author;
    this.title = storyObj.title;
    this.url = storyObj.url;
    this.username = storyObj.username;
    this.storyId = storyObj.storyId;
    this.createdAt = storyObj.createdAt;
    this.updatedAt = storyObj.updatedAt;
  }

  //update a story using a PATCH request 
  async update(user, storyData){
    const response = await axios({
      url: `${BASE_URL}/stories/${this.storyId}`,  //stories section 
        method: "PATCH",
        data: {
          user: storyData,
          token: user.loginToken  // need user.loginToken because we are in stories
        }
    });
    const {author, title, url, updateAt} = response.data.story;
    // update the properties in story class
    this.author = author;
    this.title = title;
    this.url = url;
    this.updatedAt = updatedAt;

    return this;
  }
}