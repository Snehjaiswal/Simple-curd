// const persons = [
//     {firstname : "Malcom", lastname: "Reynolds"},
//     {firstname : "Kaylee", lastname: "Frye"},
//     {firstname : "Jayne", lastname: "Cobb"}
//   ];

// //   console.log(persons.map(getFullName));

//   function getFullName(item) {
//     return [item.firstname,item.lastname].join(" ");
//   }

//   const numbers = [65, 44, 12, 4];
// const newArr = numbers.map(myFunction)
// console.log(newArr);
// function myFunction(num) {
//   return num * 10;
// }

// function rev(str) {
//     let emp = ''
//     for (let i =str.length-1;i>=0; i--){
//         emp = emp + str[i]
//     }
//     return emp
// }

// console.log(rev('sneh'));

// sort
// let arr = [5,2,1,2,4]
// for ( let i =0 ; i<arr.length ; i++ ){
//     for(let j=i+1;j<arr.length;j++){
//         if(arr[i]>arr[j]){
//            let temp = arr[i]
//             arr[i] = arr[j]
//             arr[j] =temp
//         }
//     }
// }
// console.log(arr);


var objs = [
    { first_nom: 'Lazslo', last_nom: 'Jamf', age: 18 },
    { first_nom: 'Pig', last_nom: 'Bodine', age: 19 },
    { first_nom: 'Pirate', last_nom: 'Prentice', age: 17 }
];
// objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))

objs.sort((a, b) => a.age > b.age ? 1 : -1);
console.log(objs);

// function compare( a, b ) {
//     if ( a.last_nom < b.last_nom ){
//       return -1;
//     }
//     if ( a.last_nom > b.last_nom ){
//       return 1;
//     }
//     return 0;
//   }
  
//   console.log(objs.sort( compare ));

