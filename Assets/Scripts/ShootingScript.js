var recoilMod : Transform;
var weapon : GameObject;
var maxRecoil_x : float = -20;
var recoilSpeed : float = 10;
var recoil : float = 0.0;

function Update() {
    if(Input.GetMouseButtonDown(0))
    {
        //every time you fire a bullet, add to the recoil.. of course you can probably set a max recoil etc..
        recoil+= 0.1;
    }
    recoiling();
}
function recoiling() {
    if(recoil > 0)
    {
    	// Get the max rotation on the z axis
        var maxRecoil = Quaternion.Euler (0, 0, maxRecoil_x);
        // Dampen towards the target rotation
        recoilMod.rotation = Quaternion.Slerp(recoilMod.rotation, maxRecoil, Time.deltaTime * recoilSpeed);
        // commit change
        weapon.transform.localEulerAngles.z = recoilMod.localEulerAngles.z;
        recoil -= Time.deltaTime;
    }
    else
    {
    // return to norm
        recoil = 0;
        var minRecoil = Quaternion.Euler (0, 0, 0);
        // Dampen towards the target rotation
        recoilMod.rotation = Quaternion.Slerp(recoilMod.rotation, minRecoil,Time.deltaTime * recoilSpeed / 2);
        weapon.transform.localEulerAngles.z = recoilMod.localEulerAngles.z;
    }

}