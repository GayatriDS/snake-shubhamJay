const Snake=function(head,body) {
  this.head=head;
  this.body=body;
}

Snake.prototype={
  getBody:function() {
    return this.body;
  },
  getHead:function() {
    return this.head;
  },
  move:function() {
    this.body.push(this.head);
    this.head=this.head.next();
    return this.body.shift();
  },
  grow:function() {
    this.body.unshift(new Position(Infinity,Infinity,this.direction));
  },
  turnLeft:function() {
    this.head=this.head.turnLeft();
  },
  turnRight:function() {
    this.head=this.head.turnRight();
  },
  getHeadXCoord : function(){
    return this.head.getCoord()[0];
  },
  getHeadYCoord: function(){
    return this.head.getCoord()[1];
  },
  hasCollidedHorizontally : function(initialLimit,finalLimit){
    let headPos = this.getHeadXCoord();
    return headPos <= initialLimit || headPos >= finalLimit;
  },
  hasCollidedVertically : function(initialLimit,finalLimit){
    let headPos = this.getHeadYCoord();
    return headPos <= initialLimit || headPos >= finalLimit;
  },
  getBodyCoords : function(){
    return this.body.map((ele)=>[ele.x,ele.y])
  },
  isEatingItself : function(){
    let bodyCoords = this.getBodyCoords();
    let headCoords = this.getHead();
    let headPos = [headCoords.x,headCoords.y];
    let areSameCoords = this.isSame.bind(null,headPos);
    return bodyCoords.some(areSameCoords);
  },
  isSame : function(headPos,bodyElement){
     return bodyElement[0] == headPos[0] && bodyElement[1] == headPos[1];
  };
}
