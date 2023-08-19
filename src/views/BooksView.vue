<template>
  <div>
    <router-link :to="{ name: 'add-book' }" class="btn btn-primary"> Add Book </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'edit-book', params: { id: 1 } }" class="btn btn-primary">
      Edit Book
    </router-link>
  </div>
</template>

<script setup></script>
