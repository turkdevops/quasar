<template>
  <div class="q-layout-padding">
    <!--
      This is for fast tests.
      Use this page but don't add it into your commits (leave it outside
      of your commit).

      For some test that you think it should be persistent,
      make a new *.vue file here or in another folder under /dev/components.
    -->
    <div class="q-gutter-y-md" style="max-width: 350px">
      <!-- <div>{{arr.join(',')}}</div> -->
      <q-option-group
        v-model="panel"
        inline
        :options="[
          { label: 'Mails', value: 'mails' },
          { label: 'Alarms', value: 'alarms' },
          { label: 'Movies', value: 'movies' }
        ]"
      ></q-option-group>

      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="mails">
          <div class="text-h6" :class="getTest()">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <!-- <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="mails">
          <div class="text-h6" :class="getTest()">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels> -->
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { h, ref, computed, watch, nextTick, onBeforeUnmount, onMounted, getCurrentInstance } from 'vue'
const arr = ref([]);
const panel = ref('mails')
function getTest() {
  arr.value.push('cccccc');
  console.log(arr.value.length);
  return 'xxxx'
}
</script>
