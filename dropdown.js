/*
DropDown for Mootools 1.2.2
(c) 2009 Enrique Erne
MIT License
*/

var DropDown = new Class({	Implements: Options,
	options: {
		item: 'li',
		submenu: 'ul',
		animate: 'height',
		property: 'getHeight',
		modify: 'sum',
		over: {duration: 200},
		out: {duration: 800},
		fixIE: true
	},
	initialize: function(menu, options){
		this.setOptions(options);
		var items = ($type(this.options.item) === 'element') ? [this.options.item] : menu.getChildren(this.options.item);
		// fix IE quirks
		if(Browser.Engine.trident && this.options.fixIE){
			menu.getElements(this.options.submenu).each(function(el){
				var kids = el.getChildren(($type(this.options.item) === 'element') ? 'li' : this.options.item);
				kids.getElement('a').setStyles({
					'width': kids.getWidth().max() - ( kids[0].getElement('a').getStyle('padding-left').toInt() + kids[0].getElement('a').getStyle('padding-right').toInt() )
				});
			}.bind(this));
		}
		items.each(function(el){
			var submenu = el.getElement(this.options.submenu), animate = this.options.animate;
			if ($chk(submenu)){
				var original = submenu.getChildren('li a')[this.options.property]()[this.options.modify]();
				// TAB navigation for IE using the TAB key  ->|
				if(Browser.Engine.trident) el.getElements('a:first-child, li:last-child a').addEvent('focus', function(){
					menu.getElements('li.hover').each(function(elh){
						elh.fireEvent('mouseleave');
					});
					el.fireEvent('mouseenter');
				});
				submenu.setStyle(animate, 0);
				var over = this.options.over, out = this.options.out
				el.addEvents({
					'mouseenter': function(){
						submenu.set('tween', over).tween(animate, original);
						el.addClass('hover');
					},
					'mouseleave': function(){
						submenu.set('tween', out).tween(animate, 0);
						el.removeClass('hover');
					}
				});
			}
		}.bind(this));
	}
});
