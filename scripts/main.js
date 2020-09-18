const sketch = (app) => {

  app.setup = () => {
    app.createCanvas(window.innerWidth, window.innerHeight);

    app.background(0);

    drawPath(3, 300);
  }

  app.draw = () => {
  }

  const drawCurve = (start, angStart, mag) => {
    const hanMagMax = mag * .4;
    const hanMagMin = mag * .2;
    const end = p5.Vector.random2D() // creamos un vector con dirección aleatorio y magnitud 1
      .mult(mag) // multiplicamos el vector por la magnitd deseada
      .add(start); // le agregamos el punto de partida

    const hanStart = new p5.Vector(1, 0).rotate(angStart).mult(hanMagMax * Math.random() + hanMagMin).add(start);
    const l = p5.Vector.random2D().mult(hanMagMax * Math.random() + hanMagMin);
    const hanEnd = l.copy().add(end);

    app.noFill();
    app.stroke(255);
    app.bezier(
      start.x, start.y,
      hanStart.x, hanStart.y,
      hanEnd.x, hanEnd.y,
      end.x, end.y,
    );

    app.stroke(200);
    app.line(start.x, start.y, hanStart.x, hanStart.y);
    app.line(end.x, end.y, hanEnd.x, hanEnd.y);

    app.noStroke();
    app.fill(255, 0, 0);
    app.ellipse(start.x, start.y, 10, 10);
    app.ellipse(end.x, end.y, 10, 10);
    app.fill(0, 255, 0);
    app.ellipse(hanStart.x, hanStart.y, 10, 10);
    app.ellipse(hanEnd.x, hanEnd.y, 10, 10);

    //const angEnd = Math.atan2(0 - l.copy().normalize().y, 1 - l.copy().normalize().x);
    const angEnd = new p5.Vector(1, 0).angleBetween(l.copy().normalize());
    return {
      end: end.copy(), // retornamos el punto final porque debe ser el punto inicial de la siguiente curva
      angEnd: angEnd, // retornamos el ángulo del handler final para usarlo en el inicial del siguiente
    }
  }

  const drawPath = (steps, mag) => {
    let prev = {
      end: new p5.Vector(500, 500),
      angEnd: Math.random() * Math.PI * 2,
    }
    for(let i = 0; i < steps; i++) {
      prev = drawCurve(prev.end, prev.angEnd + Math.PI, mag);
    }
  }

}

window.addEventListener('load', () => new p5(sketch));