var walkAcceleration       : float = 5;
var walkDeacceleration     : float = 5;
var cameraObject 	       : GameObject;
var maxWalkSpeed	       : float = 20;
var maxSlope               : float = 60;
var jumpVelocity           : float = 20;
var walkAccelAirRatio      : float = 0.1;
@HideInInspector
var walkDeaccelerationVolx : float;
@HideInInspector
var walkDeaccelerationVolz : float;
@HideInInspector
var grounded         	   : boolean = false;
@HideInInspector
var horizontalMovement     : Vector2;
function Update () {
	horizontalMovement = Vector2(rigidbody.velocity.x, rigidbody.velocity.z);
	if(horizontalMovement.magnitude > maxWalkSpeed) {
		horizontalMovement = horizontalMovement.normalized;
		horizontalMovement *= maxWalkSpeed;
	}
	rigidbody.velocity.x = horizontalMovement.x;
	rigidbody.velocity.z = horizontalMovement.y;
	
	if(grounded) {
		rigidbody.velocity.x = Mathf.SmoothDamp(rigidbody.velocity.x, 0, walkDeaccelerationVolx, walkDeacceleration);
		rigidbody.velocity.z = Mathf.SmoothDamp(rigidbody.velocity.z, 0, walkDeaccelerationVolz, walkDeacceleration);
	}
	
	if(grounded) {			
		rigidbody.AddRelativeForce(Time.deltaTime * walkAcceleration * Input.GetAxis("Horizontal"), 0, Time.deltaTime * walkAcceleration * Input.GetAxis("Vertical"));
	} else {
		rigidbody.AddRelativeForce(Time.deltaTime * walkAccelAirRatio * walkAcceleration * Input.GetAxis("Horizontal"), 0, Time.deltaTime * walkAcceleration * walkAccelAirRatio * Input.GetAxis("Vertical"));
	}
	
	if(Input.GetButtonDown("Jump") && grounded)
		rigidbody.AddForce(0, jumpVelocity, 0);
}
// Jump when feet are planted.
function OnCollisionStay (collision : Collision) {
	for( var contact: ContactPoint in collision.contacts) {
		if(Vector3.Angle(contact.normal, Vector3.up) < maxSlope) {
			grounded = true;
		}	
	}
}
// When notify that you are in the air.
function OnCollisionExit() {
	grounded = false;
}