function getrandom() {
    return Math.round(Math.random(1));
}

console.log(getrandom());

let circle = document.getElementById("circleMain");
console.log(circle);



let leftAvailableCount = 3;
let rightAvailableCount = 3;

function startAnimation() {

    let random = getrandom();

    if (leftAvailableCount == 0 && rightAvailableCount == 0) {
        moveAway();
        return;
    }

    if(leftAvailableCount==1 && rightAvailableCount==1){
        let mainCirclesX = circle.getAttribute("cx");
        console.log(mainCirclesX);
        if(mainCirclesX>100){
            random = 0;
        }else{
            random = 1;
        }
    }


    if (random == 0 && leftAvailableCount == 0) {
        random = 1;
    }
    if (random == 1 && rightAvailableCount == 0) {
        random = 0;
    }

    if (random == 0 && leftAvailableCount == 1 && rightAvailableCount > 1) {
        random = 1;
    }

    if (random == 1 && rightAvailableCount == 1 && leftAvailableCount > 1) {
        random = 0;
    }

    if (random == 0) {
        let initialLeftPosition = 100;
        function removeLeft() {
            let id = "left" + leftAvailableCount;
            initialLeftPosition -= 5;
            document.getElementById(id).setAttribute("cx", initialLeftPosition);
            if (initialLeftPosition >= -45) {
                requestAnimationFrame(removeLeft);
            } else {
                leftAvailableCount--;
                setLeftRemainings();
                moveMain();
                setTimeout(startAnimation, 3000);
            }
        }
        requestAnimationFrame(removeLeft);
    } else {
        let initialRightPosition = 700;
        function removeRight() {
            let id = "right" + rightAvailableCount;
            initialRightPosition += 5;
            document.getElementById(id).setAttribute("cx", initialRightPosition);
            if (initialRightPosition <= 845) {
                requestAnimationFrame(removeRight);
            } else {
                rightAvailableCount--;
                setRightRemainings();
                moveMain();
                setTimeout(startAnimation, 3000);
            }
        }
        requestAnimationFrame(removeRight);
    }

}

startAnimation();


function setLeftRemainings() {
    let allLeft = document.querySelectorAll(".l");
    for (let i = 0; i < allLeft.length; i++) {
        let prevPosition = allLeft[i].getAttribute("cy");
        allLeft[i].setAttribute("cy", +prevPosition + 120);
    }
}

function setRightRemainings() {
    let allRight = document.querySelectorAll(".right");
    for (let i = 0; i < allRight.length; i++) {
        let prevPosition = allRight[i].getAttribute("cy");
        allRight[i].setAttribute("cy", +prevPosition + 120);
    }
}


function moveMain() {
    if (leftAvailableCount < rightAvailableCount) {
        let y = 580 - 120 * leftAvailableCount;
        let x = 100;
        let crrX = circle.getAttribute("cx");
        console.log(crrX);
        let crrY = circle.getAttribute("cy");
        function moveToLeft() {
            if (crrX >= x) {
                crrX -= 1.5;
                // console.log(crrX);
                circle.setAttribute("cx", crrX);
            }
            if (crrY <= y) {
                crrY++;
                circle.setAttribute("cy", crrY);
            }
            if (crrX >= x || crrY <= y) {
                requestAnimationFrame(moveToLeft);
            }
        }
        requestAnimationFrame(moveToLeft);
    }

    if (rightAvailableCount < leftAvailableCount) {
        let y = 580 - 120 * rightAvailableCount;
        let x = 700;
        let crrX = +circle.getAttribute("cx");
        // console.log(crrX);
        let crrY = circle.getAttribute("cy");
        function moveToRight() {
            if (crrX <= x) {
                crrX += 1.5;
                // console.log(crrX);
                circle.setAttribute("cx", crrX);
            }
            if (crrY <= y) {
                crrY++;
                circle.setAttribute("cy", crrY);
            }
            if (crrX <= x || crrY <= y) {
                requestAnimationFrame(moveToRight);
            }
        }
        requestAnimationFrame(moveToRight);
    }
}


function moveAway() {
    let line = document.getElementById("lineMiddle");
    let initialX = line.getAttribute("x2");
    let initialY = line.getAttribute("y2");

    function moveLine() {
        initialX -= 3;
        initialY -= 3;
        if (initialY >= 550) {
            line.setAttribute("y2", initialY);
        }
        if (initialX >= 315) {
            line.setAttribute("x2", initialX);
        }

        if (initialX >= 315 || initialY >= 550) {
            requestAnimationFrame(moveLine);
        } else {
            moveCircles();
        }
    }
    requestAnimationFrame(moveLine);

    function moveCircles() {
        let leftCircle = document.getElementById("descLeft");
        let rightCircle = document.getElementById("descRight");
        let initialLeftCirclePositionX = +leftCircle.getAttribute("cx");
        let initialRightCirclePositionX = 600;
        console.log(initialLeftCirclePositionX);

        function moveToCenter() {
            initialLeftCirclePositionX += 4;
            initialRightCirclePositionX -= 4;
            if (initialLeftCirclePositionX <= 365) {
                leftCircle.setAttribute("cx", initialLeftCirclePositionX);
            }
            if (initialRightCirclePositionX >= 365) {
                rightCircle.setAttribute("cx", initialRightCirclePositionX);
            }
            if (initialLeftCirclePositionX <= 365 || initialRightCirclePositionX >= 365) {
                requestAnimationFrame(moveToCenter);
            } else {
                moveToTop();
            }
        }
        requestAnimationFrame(moveToCenter);

    }

    let y = 700;
    function moveToTop() {
        y -= 5;
        let leftCircle = document.getElementById("descLeft");
        let rightCircle = document.getElementById("descRight");
        if (y >= -50) {
            leftCircle.setAttribute("cy", y);
            rightCircle.setAttribute("cy", y);
            requestAnimationFrame(moveToTop);
        }
    }

}

