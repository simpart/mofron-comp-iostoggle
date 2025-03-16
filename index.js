/**
 * @file mofron-comp-iostoggle/index.js
 * @brief smart switch component for mofron
 * @license MIT
 */
const Frame  = require("mofron-comp-frame");
const Circle = require("mofron-comp-circle");
const Click = require("mofron-event-click");
const Move  = require("mofron-effect-move");
const Color = require("mofron-effect-color");
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends Frame {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("iOSToggle");
	    this.shortForm();
            
	    /* init config */
	    this.confmng().add("status_buff", { type:'boolean', init:false });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();

	    // frame setting
	    this.config({
	        //size: new ConfArg("0.8rem","0.35rem"),
	        radius:"0.5rem", mainColor:[229,229,234], borderWidth:"0rem",
	        style: { "display":"flex", "align-items":"center" },
		event: new Click(new ConfArg(this.switch,this)),
                effect: [
		    // on effect eid=2
                    new Color({ eid:2, type:"base", color:[52,199,89], speed:250 }),
		    // off effect eid=3
		    new Color({ eid:3, type:"base", color:[229,229,234], speed:250 })
                ]
            });

            // nob setting
	    this.nob().config({
	        color:  new ConfArg("white","white","white"),
                borderWidth:"0rem",
		style:  { "position":"relative", "left":"0.02rem" },
                effect: [
		    // on effect, eid=2
		    new Move({ eid:2, type:"left", speed:250, tag:"on_move" }),
		    // off effect, eid=3
		    new Move({ eid:3, type:"left", toValue:"0.02rem", speed:250 }),
		]
            });
	    this.child(this.nob());


	    this.autoWidth("0.6rem");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.afterRender();
            if (true === this.status()) {
                this.status(this.status());
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    autoWidth (prm) {
        try {
	    // frame size
	    let hei_siz = comutl.getsize(prm);
	    let set_hei = hei_siz.value()/2 + hei_siz.type();
            this.size(prm, set_hei);
	    this.radius(hei_siz.value()/2 + hei_siz.type());
            
	    // nob size
            this.nob().size(
                comutl.sizediff(set_hei,"0.04rem"),
		comutl.sizediff(set_hei,"0.04rem"),
	    );

	    // nob effect
	    let mov_val = comutl.sizediff(prm, this.nob().width());
            this.nob().effect({ modname:"Move", tag:"on_move" }).toValue(
	        mofron.util.common.sizediff(mov_val, "0.02rem")
	    );
	    let nob_wid = comutl.getsize(this.nob().width());
	    this.nob().radius(nob_wid.value()/2 + nob_wid.type());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    nob (prm) {
        try {
            return this.innerComp("nob",prm,Circle);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    switch (s1,s2,s3) {
        try {
            let left = s3.nob().style("left");
            if ("0.02rem" === left) {
                // on status
		s3.execEffect(2);
		s3.nob().execEffect(2);
	    } else {
                // off status
		s3.execEffect(3);
                s3.nob().execEffect(3);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    status (prm) {
        try {
	    let ret = this.confmng("status_buff", prm);
	    if ((true === this.isExists()) && (undefined !== prm)) {
                this.switch(prm);
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

}
/* end of file */
