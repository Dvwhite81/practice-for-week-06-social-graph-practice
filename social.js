// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    let newUser = {
      'id': this.currentID,
      'name': name
    };

    this.users[newUser.id] = newUser;
    this.follows[newUser.id] = new Set();

    return newUser.id;
  }

  getUser(userID) {
    if (!this.users[userID]) return null;

    return this.users[userID];
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    if (this.users[userID]) return this.follows[userID];
  }

  getFollowers(userID) {
    let set = new Set();

    for (let follower in this.follows) {
      let current = this.follows[follower];

      if (current.has(userID)) {
        let user = this.users[follower].id;

        set.add(user);
      }
    }

    return set;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let visited = new Set();
    let friends = [];

    while (queue.length > 0) {
      let path = queue.shift();
      let index = path.length - 1;
      let currentNode = path[index];

      if(!visited.has(currentNode)) {
        visited.add(currentNode);

        // path.length didn't work like in notes
        // had to be path.length - 1
        // rather than add - 1 every time, stored as index
        if (index > 1 && index <= degrees + 1) {
          friends.push(currentNode);
        }

        let neighbors = [...this.follows[currentNode]];
        for (let i = 0; i < neighbors.length; i++) {
          let pathCopy = [...path];
          pathCopy.push(neighbors[i]);
          queue.push(pathCopy);
        }
      }
    }
    return friends;
  }
}

module.exports = SocialNetwork;
