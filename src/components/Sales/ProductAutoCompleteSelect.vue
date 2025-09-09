<template>
 <v-autocomplete
  clearable
  chips
  label="ค้นหาสินค้า"
  v-model="selectedItem"
  :items=saleOrderStore.productItems
  :item-value="item => item.code"
  :item-text="item => item.itemname"

  @update:modelValue="edit"

></v-autocomplete>
</template>

<script setup>

/*
v-autocomplete api =>

Events
click:append
[MosaleOrderStore]
Emitted when append icon is clicked.

click:appendInner
[MosaleOrderStore]
Emitted when appended inner icon is clicked.

click:clear
[MosaleOrderStore]
Emitted when clearable icon clicked.

click:prepend
[MosaleOrderStore]
Emitted when prepended icon is clicked.

click:prependInner
[MosaleOrderStore]
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
import { useSaleOrderStore } from '@/stores/saleOrderStore';

const saleOrderStore = useSaleOrderStore();

const colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'];

const selectedItem = ref(null);



const items = reactive([
    { header: true, title: 'Select an option or create one' },
    ...saleOrderStore.productItems
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

  const foundItem = saleOrderStore.productItems.find(customer => customer.itemname === item);
  if (foundItem) {
    //console.log('Found item:', foundItem);
    // Perform any additional actions with the found item

    const foundItemJson = JSON.parse(JSON.stringify(foundItem));
    //console.log(foundItemJson);

    saleOrderStore.productItem = foundItemJson;
    saleOrderStore.addProductItemToSaleOrderItems();


    console.log(saleOrderStore.saleorderItems);

  } else {
    console.log('Item not found');
  }

};

const filter = (value, queryText, item) => {
  const toLowerCaseString = val => String(val != null ? val : '').toLowerCase();
  const query = toLowerCaseString(queryText);

  const availableOptions = items.filter(x => !model.value.includes(x));
  const hasAnyMatch = availableOptions.some(
    x => !x.header && toLowerCaseString(x.itemname).includes(query)
  );
  if (item.raw.header) return !hasAnyMatch;

  const text = toLowerCaseString(item.raw.itemname);
  return text.includes(query);
};

const removeSelection = (index) => {
  model.value.splice(index, 1);
};
</script>
