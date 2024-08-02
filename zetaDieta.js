function zetadieta(C, P, G) {

  let caloriasTotales = 0;
  let cantC = Math.ceil(C / 27)//cantidad de bananas que necesito 
  let cantP = Math.ceil(P / 30)//cantidad de atun que necesito 
  let cantG = Math.ceil(G / 1)//cantidad de aceite que necesito 
  
  caloriasTotales += cantC * 105  
  caloriasTotales += cantP * 120
  caloriasTotales += cantG * 9  

  // carbo 27 calorias 105
  // prote 30 calorias 120
  // grasas 1 calorias 9

  return caloriasTotales
}

let r = zetadieta(1000, 1000, 1000);
console.log(r);
