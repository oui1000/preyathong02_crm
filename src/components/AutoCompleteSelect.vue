<template>
 <v-autocomplete
  clearable
  chips
  label="ค้นหาลูกค้า"
  v-model="selectedItem"
  :items=useEvent.customerItems
  :item-color="item => item.color"
  :item-text="item => item.title"

  @update:modelValue="edit"

></v-autocomplete>
</template>

<script setup>

/*
v-autocomplete api =>

Events
click:append
[MouseEvent]
Emitted when append icon is clicked.

click:appendInner
[MouseEvent]
Emitted when appended inner icon is clicked.

click:clear
[MouseEvent]
Emitted when clearable icon clicked.

click:prepend
[MouseEvent]
Emitted when prepended icon is clicked.

click:prependInner
[MouseEvent]
Emitted when prepended inner icon is clicked.

update:focused
[boolean]
Emitted when the input is focused or blurred

update:menu
[boolean]
Event that is emitted when the component’s menu state changes.

update:modelValue
[any]
Event that is emitted when the component’s model changes.

update:search
[any]
Event emitted when the search value changes.
*/


import { ref, reactive, watch, onMounted } from 'vue';
import { useEventStore } from '@/stores/eventStore';

const useEvent = useEventStore();

const colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'];

const selectedItem = ref(null);



const items = reactive([
    { header: true, title: 'Select an option or create one' },
    ...useEvent.customerItems
  ]);
const nonce = ref(0);
const model = ref([]);
const search = ref(null);

watch(model, (val, prev) => {
  if (val.length === prev.length) return;

  model.value = val.map(v => {
    if (typeof v === 'string') {
      v = {
        title: v,
        color: colors[nonce.value - 1],
      };

      items.push(v);
      nonce.value++;
    }

    return v;
  });
});

onMounted(() => {
  model.value = [items[1]];
});

const edit = async (item) => {

  //alert("edit");

  const foundItem = useEvent.customerItems.find(customer => customer.title === item);
  if (foundItem) {
    //console.log('Found item:', foundItem);
    // Perform any additional actions with the found item

    const foundItemJson = JSON.parse(JSON.stringify(foundItem));
    //console.log(foundItemJson);

    useEvent.customer = foundItemJson;
    useEvent.event.customerid = foundItemJson.customerid;
    useEvent.event.customername = foundItemJson.customername;
    useEvent.event.docno = foundItemJson.customerid;
    useEvent.event.customeraddress = foundItemJson.address;
    useEvent.event.databasename = foundItemJson.databasename;

    await useEvent.fetchLastCustomerOrder(foundItemJson.customerid); // fetch lastOrder from api


    //alert(foundItemJson.customerid);

  } else {
    console.log('Item not found');
  }

};

const filter = (value, queryText, item) => {
  const toLowerCaseString = val => String(val != null ? val : '').toLowerCase();
  const query = toLowerCaseString(queryText);

  const availableOptions = items.filter(x => !model.value.includes(x));
  const hasAnyMatch = availableOptions.some(
    x => !x.header && toLowerCaseString(x.title).includes(query)
  );
  if (item.raw.header) return !hasAnyMatch;

  const text = toLowerCaseString(item.raw.title);
  return text.includes(query);
};

const removeSelection = (index) => {
  model.value.splice(index, 1);
};
</script>
