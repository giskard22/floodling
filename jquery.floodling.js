/**
 * Fork by Matt Rosenberg of "floodling" (see below).
 * https://github.com/giskard22/floodling
 * Version from 2013-08-07

 * jQuery floodling v1.1.7 https://github.com/hyubs/floodling
 * Written by Hyubs Ursua
 * Copyright (c) 2013
 * Website: https://github.com/hyubs/floodling
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {
	$.fn.floodling = function() {
		var parent, elem, val, names, name;

		if(arguments.length == 1) {
			if((typeof arguments[0] === 'object')&&(!(arguments[0] instanceof Array))) {
				names = arguments[0];
				parent = $(this);
			}
			else {
				parent = $('body');
				elem = $(this);
				val = arguments[0];
				name = elem.attr('name');
				setValue(parent, elem, val, name);
				return;
			}
		}
		else if(arguments.length == 2) {
			var obj = {};
			obj[arguments[0]] = arguments[1];
			names = obj;
			parent = $(this);
		}		

		for(var name in names) {
			val = names[name];
			elem = parent.find('[name="' + name + '"]');
			if (! elem.length) {
				elem = parent.find('#' + name);
			}
			setValue(parent, elem, val, name);
		}
	};
	
	function setValue(parent, elem, val, name) {
		var tag, type, nameLen, i, cbox, selectVal, ms;
		
		if(typeof elem !== 'undefined' && elem.length > 0) {
			tag = elem.prop("tagName").toLowerCase();
			switch (tag) {
				case 'input':
					type = elem.prop('type').toLowerCase();
					
					switch (type) {
						case 'radio':
							parent.find('[name="' + name + '"][value="' + val + '"]').prop("checked", true);
						break;
						case 'checkbox':
							nameLen = name.length;
							if(nameLen > 2 && name.substring(nameLen - 2, nameLen) == '[]') {
								if(val instanceof Array) {
									for (i = 0; i < val.length; i++){
										cbox = parent.find('[name="' + name + '"][value="' + val[i] + '"]');
										if(cbox.prop('checked')) {
											cbox.prop('checked', false);
										}
										else {
											cbox.prop('checked', true);
										}
									}
								}
								else {
									cbox = parent.find('[name="' + name + '"][value="' + val + '"]');
									if(cbox.prop('checked')) {
										cbox.prop('checked', false);
									}
									else {
										cbox.prop('checked', true);
									}
								}					
							}
							else {
								if(val != false) {
									elem.prop('checked', true);
								}
								else {
									elem.prop('checked', false);
								}
							}
						break;
						case 'image':
							elem.prop('src', val);
						break;
						default: // text, password, submit, button, reset, date, color, etc.
							elem.val(val);
					}
				break;
				case 'textarea':
					elem.val(val);
				break;
				case 'select':
					if(elem.prop('multiple')) {
						selectVal = elem.val();
						if(selectVal === null) {
							selectVal = [];
						}
						else if(typeof selectVal === 'string') {
							selectVal = [selectVal];
						}
						if(val instanceof Array) {
							for (i = 0; i < val.length; i++) {
								ms = parent.find('[value="' + val[i] + '"]');
								if(ms.prop('selected')==true){
									ms.prop('selected', false);
								}
								else{
									ms.prop('selected', true);
								}
							}
						}
						else {
							ms = parent.find('[value="' + val + '"]');
							if(ms.prop('selected')==true) {
								ms.prop('selected', false);
							}
							else {
								ms.prop('selected', true);
							}
						}
					}
					else {
						elem.val(val);
					}
				break;
				default:
					elem.html(val);
			}
		}
		else {
			console.log('Element $("' + elem.selector +'") was not found.');
		}
	}
})(jQuery);