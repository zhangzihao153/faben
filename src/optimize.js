import React, { Component } from 'react'
function optimize(item) {
    let arr=[]
    for(let i=1;i<=3;i++){
      var obj={"title":"标题"+i,"key":i,"render":"item=><a href='http://hello.com/'"+i+">"+item[i]+"</a>"}
      arr.push(obj);
    }
}
export default optimize