#define PROXIMITY_NONE ""
#define PROXIMITY_ON_SCREEN "_red"
#define PROXIMITY_NEAR "_yellow"

/**
 * Multitool -- A multitool is used for hacking electronic devices.
 */

/obj/item/multitool
	name = "multitool"
	desc = "Used for pulsing wires to test which to cut. Not recommended by doctors."
	icon = 'icons/obj/device.dmi'
	icon_state = "multitool"
	belt_icon = "multitool"
	flags = CONDUCT
	force = 5.0
	w_class = WEIGHT_CLASS_SMALL
	throwforce = 0
	throw_range = 7
	throw_speed = 3
	drop_sound = 'sound/items/handling/multitool_drop.ogg'
	pickup_sound =  'sound/items/handling/multitool_pickup.ogg'
	materials = list(MAT_METAL=50, MAT_GLASS=20)
	origin_tech = "magnets=1;engineering=2"
	toolspeed = 1
	tool_behaviour = TOOL_MULTITOOL
	hitsound = 'sound/weapons/tap.ogg'
	var/shows_wire_information = FALSE // shows what a wire does if set to TRUE
	var/obj/machinery/buffer // simple machine buffer for device linkage
	var/datum/multitool_menu_host/menu

/obj/item/multitool/Initialize()
	. = ..()
	menu = new(src)

/obj/item/multitool/proc/IsBufferA(typepath)
	if(!buffer)
		return 0
	return istype(buffer,typepath)

/obj/item/multitool/multitool_check_buffer(user, silent = FALSE)
	return TRUE

/obj/item/multitool/proc/set_multitool_buffer(mob/user, obj/machinery/M)	//Loads a machine into memory, returns TRUE if it does
	if(!ismachinery(M))
		to_chat(user, "<span class='warning'>That's not a machine!</span>")
		return
	buffer = M
	to_chat(user, "<span class='notice'>You load [M] into [src]'s internal buffer.</span>")
	return TRUE

/obj/item/multitool/attack_self(mob/user)
	menu.interact(user)

/obj/item/multitool/Destroy()
	buffer = null
	QDEL_NULL(menu)
	return ..()

// Syndicate device disguised as a multitool; it will turn red when an AI camera is nearby.
/obj/item/multitool/ai_detect
	var/track_cooldown = 0
	var/track_delay = 10 //How often it checks for proximity
	var/detect_state = PROXIMITY_NONE
	var/rangealert = 8	//Glows red when inside
	var/rangewarning = 20 //Glows yellow when inside
	origin_tech = "magnets=1;engineering=2;syndicate=1"

/obj/item/multitool/ai_detect/New()
	..()
	START_PROCESSING(SSobj, src)

/obj/item/multitool/ai_detect/Destroy()
	STOP_PROCESSING(SSobj, src)
	return ..()


/obj/item/multitool/ai_detect/update_icon_state()
	icon_state = "[initial(icon_state)][detect_state]"


/obj/item/multitool/ai_detect/process()
	if(track_cooldown > world.time)
		return
	detect_state = PROXIMITY_NONE
	multitool_detect()
	update_icon(UPDATE_ICON_STATE)
	track_cooldown = world.time + track_delay

/obj/item/multitool/ai_detect/proc/multitool_detect()
	var/turf/our_turf = get_turf(src)
	for(var/mob/living/silicon/ai/AI in GLOB.ai_list)
		if(AI.cameraFollow == src)
			detect_state = PROXIMITY_ON_SCREEN
			break

	if(!detect_state && GLOB.cameranet.chunkGenerated(our_turf.x, our_turf.y, our_turf.z))
		var/datum/camerachunk/chunk = GLOB.cameranet.getCameraChunk(our_turf.x, our_turf.y, our_turf.z)
		if(!chunk)
			return
		for(var/mob/camera/aiEye/A in chunk.seenby)
			//Checks if the A is to be detected or not
			if(!A.ai_detector_visible)
				continue
			var/turf/detect_turf = get_turf(A)
			if(get_dist(our_turf, detect_turf) < rangealert)
				detect_state = PROXIMITY_ON_SCREEN
				break
			if(get_dist(our_turf, detect_turf) < rangewarning)
				detect_state = PROXIMITY_NEAR
				break

/obj/item/multitool/ai_detect/admin
	desc = "Used for pulsing wires to test which to cut. Not recommended by doctors. Has a strange tag that says 'Grief in Safety'" //What else should I say for a meme item?
	track_delay = 5
	shows_wire_information = TRUE

/obj/item/multitool/ai_detect/admin/multitool_detect()
	var/turf/our_turf = get_turf(src)
	for(var/mob/J in urange(rangewarning,our_turf))
		if(check_rights(R_ADMIN, 0, J))
			detect_state = PROXIMITY_NEAR
			var/turf/detect_turf = get_turf(J)
			if(get_dist(our_turf, detect_turf) < rangealert)
				detect_state = PROXIMITY_ON_SCREEN
				break

/obj/item/multitool/cyborg
	name = "multitool"
	desc = "Optimised and stripped-down version of a regular multitool."
	toolspeed = 0.5

/obj/item/multitool/abductor
	name = "alien multitool"
	desc = "An omni-technological interface."
	icon = 'icons/obj/abductor.dmi'
	icon_state = "multitool"
	belt_icon = "alien_multitool"
	toolspeed = 0.1
	origin_tech = "magnets=5;engineering=5;abductor=3"
	shows_wire_information = TRUE

/obj/item/multitool/brass
	name = "brass multitool"
	desc = "A multitool made of brass. You feel some signals coming out."
	icon_state = "multitool_brass"
	toolspeed = 0.5
	resistance_flags = FIRE_PROOF | ACID_PROOF
