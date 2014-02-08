var gun : Transform;
 var nextPos = 0.1116717;
 var nextField = 40.0;
 var nextPos2 = -0.2483233;
 var dampVelocity = 0.4;
 var dampVelocity2 = 0.4;
 var dampVelocity3 = 0.4;
 
 function Update () {
    var newPos = Mathf.SmoothDamp(gun.transform.localPosition.x, nextPos, dampVelocity, .6);
    var newField = Mathf.SmoothDamp(Camera.main.fieldOfView, nextField, dampVelocity2, .6);
    var newPos2 = Mathf.SmoothDamp(gun.transform.localPosition.y, nextPos2, dampVelocity3, .6);
 
    gun.transform.localPosition.x = newPos;
    gun.transform.localPosition.y = newPos2;
    Camera.main.fieldOfView = newField;
 
    if (Input.GetButton("Fire2")) {
        //adjust viewpoint and gun position
        nextField = 20.0;
        nextPos = -0.1104335;
        nextPos2 = -0.1604617;
 
        //slow down turning and movement speed
        GetComponent(CharacterMotor).movement.maxForwardSpeed = 1.5;
        GetComponent("MouseLook").sensitivityX = 2;
        camera.main.GetComponent("MouseLook").sensitivityX = 2;
        camera.main.GetComponent("MouseLook").sensitivityY = 2;
    } else {
        //adjust viewpoint and gun position
        nextField = 60.0;
        nextPos = 0.1116717;
        nextPos2 = -0.2483233;
 
        //speed up turning and movement speed
        GetComponent(CharacterMotor).movement.maxForwardSpeed = 10;
        GetComponent("MouseLook").sensitivityX = 6;
        camera.main.GetComponent("MouseLook").sensitivityX = 6;
        camera.main.GetComponent("MouseLook").sensitivityY = 6;
    }
 }