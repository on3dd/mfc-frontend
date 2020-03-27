<template>
  <div class="datalist-placeholder">
    <div class="input-placeholder">
      <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
      <input
          @input="updateData"
          @click="isActive = !isActive"
          ref="input"
          class="input"
          type="text">
    </div>
    <ul
        class="datalist"
        :style="{display: isActive ? 'block' : 'none'}">
      <li
          @click="changeActive"
          v-for="(item, idx) in activeOptions"
          :key="idx"
          class="datalist__item"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class BaseDatalist extends Vue {
    $refs!: {
      input: HTMLInputElement;
    };

    @Prop({type: String, required: true}) name!: string;
    @Prop({type: Array, required: true}) data!: string[];

    private activeOptions = this.data;
    private isActive = false;

    updateData() {
      this.activeOptions = this.data.filter((el: string) => el.includes(this.$refs.input.value));
      this.isActive = true;
    }

    changeActive(evt: MouseEvent) {
      this.$refs.input.value = (evt.target as HTMLElement).textContent!;
      this.isActive = false;
      this.$emit('select', this.$refs.input.value);
    }

    // activeOptions(): string[] {
    //   if ((this.data.length === 0) || (this.$refs.input === undefined)) return [];
    //   const data = this.data.filter((el: string) => el.includes(this.$refs.input.value));
    //   console.log('data', data);
    //   return data;
    // }
  }
</script>

<style scoped lang="scss">
  @import "../scss/colors";

  .datalist-placeholder {
    position: relative;
    width: 100%;
    height: 90px;
    font-size: 36px;

    .input-placeholder {
      position: absolute;
      width: inherit;
      height: inherit;
      font-size: inherit;
      z-index: 5;

      .input {
        width: inherit;
        height: inherit;
        border-radius: 80px;
        border: 4px solid $mfc-orange;
        font-size: inherit;
        padding: 0 1em 0 3em;

        &__icon {
          position: absolute;
          top: 50%;
          left: 1em;
          transform: translateY(-50%);
        }
      }
    }

    .datalist {
      $line-height: 36px;
      $item-height: $line-height * 1.5;
      $padding-top: 85 + $line-height * 0.5;
      $max-height: $item-height * 5 + $padding-top + 36px;

      position: absolute;
      top: 0;
      width: inherit;
      font-size: inherit;
      list-style: none;
      margin: 0;
      /*padding: 90px 1em .5em 1em;*/
      padding: $padding-top 0 1em 0;
      background: #ffffff;
      border: 4px solid $mfc-orange;
      border-radius: 50px;
      max-height: $max-height;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 1;

      -ms-overflow-style: none;
      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      &__item {
        width: inherit;
        padding: 0 1em;
        font-size: inherit;
        border-bottom: 1px solid rgba(0,0,0,.1);
        transition: .1s background-color ease-out;
        cursor: pointer;

        &:hover {
          background: rgba(0,0,0,.1);
        }
      }
    }
  }
</style>