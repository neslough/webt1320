var wait, baseAPI, searchAPIEndpoint, cmcWidget, x$;
wait = function(){
  return new Promise(function(it){
    return setTimeout(it, 100);
  });
};
baseAPI = 'https://api.scryfall.com';
searchAPIEndpoint = baseAPI + "/cards/random";
window.state = {
  format: 'standard',
  method: 'momir',
  cmc: 0,
  spellType: 'sorcery'
};
cmcWidget = $('#cmc').spinner();
$('#formats').menu({
  select: function(_, it){
    $('aside li').removeClass('active');
    $(it.item).addClass('active');
    window.state.format = $(it.item).text().toLowerCase();
  }
});
$('#methods').accordion({
  heightStyle: 'fill'
});
/* tradional select works better for my purposes than a juqery ui one */
$('#mobile-formats').change(function(it){
  return window.state.format = it.target.selectedOptions[0].value;
});
$('button').button();
$('#momir-go').click(async function(){
  var x$, creature, equipment, y$, z$, e;
  $('#sfx')[0].play();
  x$ = window.state;
  x$.method = 'momir';
  x$.cmc = +cmcWidget.spinner('value');
  try {
    creature = (await fetch(searchAPIEndpoint + "?q=not:dfc%20t:creature%20cmc=" + window.state.cmc + "%20f:" + window.state.format).then(function(it){
      return it.json();
    }));
    (await wait());
    equipment = (await fetch(searchAPIEndpoint + "?q=not:dfc%20t:equipment%20cmc<" + window.state.cmc + "%20f:" + window.state.format).then(function(it){
      return it.json();
    }));
    $('#creature-a').attr('href', creature.scryfall_uri);
    y$ = $('#creature-img');
    y$.attr('src', creature.image_uris.normal);
    y$.attr('alt', creature.name);
    y$.attr('title', creature.name);
    $('#equipment-a').attr('href', equipment.scryfall_uri);
    z$ = $('#equipment-img');
    z$.attr('src', equipment.image_uris.normal);
    z$.attr('alt', equipment.name);
    z$.attr('title', equipment.name);
  } catch (e$) {
    e = e$;
    alert(e);
  }
});
x$ = $('#instants');
x$.checkboxradio({
  icon: false
});
x$.click(function(){
  var k;
  k = $('#instants').prop('checked');
  $('#instants-text').text(k ? 'Instants' : 'Sorceries');
  return window.state.spellType = k ? 'instant' : 'sorcery';
});
$('#jhoira-go').click(async function(){
  var word, spells, e;
  $('#sfx')[0].play();
  window.state.method = 'jhoira';
  word = ['one', 'two', 'three'];
  spells = [];
  try {
    spells[0] = (await fetch(searchAPIEndpoint + "?q=not:dfc%20t:" + window.state.spellType + "%20f:" + window.state.format).then(function(it){
      return it.json();
    }));
    (await wait());
    spells[1] = (await fetch(searchAPIEndpoint + "?q=not:dfc%20t:" + window.state.spellType + "%20f:" + window.state.format).then(function(it){
      return it.json();
    }));
    (await wait());
    spells[2] = (await fetch(searchAPIEndpoint + "?q=not:dfc%20t:" + window.state.spellType + "%20f:" + window.state.format).then(function(it){
      return it.json();
    }));
    spells.forEach(function(spell, index){
      var x$;
      console.log(index);
      $("#spell-" + word[index] + "-a").attr('href', spell.scryfall_uri);
      x$ = $("#spell-" + word[index] + "-img");
      x$.attr('src', spell.image_uris.normal);
      x$.attr('alt', spell.name);
      x$.attr('title', spell.name);
      return x$;
    });
  } catch (e$) {
    e = e$;
    alert(e);
  }
});