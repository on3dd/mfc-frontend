<template>
  <div class="datalist-placeholder">
    <div class="input-placeholder">
      <img src="../assets/images/search-icon.svg" class="input__icon" alt="Поиск">
      <input
          @input="updateData"
          @click="isActive = true"
          ref="input"
          class="input"
          type="text">
    </div>
    <ul
        ref="datalist"
        :class="['datalist', isActive ? 'active': '']">
      <li
          @click="changeActive"
          v-for="(item, idx) in activeOptions"
          :key="idx"
          class="datalist__item"
      >{{item}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class BaseDatalist extends Vue {
    $refs!: {
      input: HTMLInputElement;
      datalist: HTMLUListElement;
    };

    @Prop({type: String, required: true}) name!: string;
    @Prop({type: Array, required: true}) data!: string[];

    private activeOptions = this.data;
    private isActive = false;

    mounted() {
      document.addEventListener('click', (evt: MouseEvent) => {
        if (this.isActive && (evt.target !== this.$refs.datalist) && (evt.target !== this.$refs.input)) {
          this.isActive = false;
        }
      })
    }

    updateData() {
      this.activeOptions = this.data.filter((el: string) => el.includes(this.$refs.input.value));
      this.isActive = true;
    }

    changeActive(evt: MouseEvent) {
      this.$refs.input.value = (evt.target as HTMLElement).textContent!;
      this.$emit('select', this.$refs.input.value);
    }
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

      display: none;
      position: absolute;
      top: 0;
      width: inherit;
      font-size: inherit;
      list-style: none;
      margin: 0;
      padding: $padding-top 0 1em 0;
      background: #ffffff;
      border: 4px solid $mfc-orange;
      border-radius: 50px;
      max-height: $max-height;
      overflow-y: auto;
      overflow-x: hidden;
      transition: all .2s ease-out;
      box-shadow: 0 20px 20px 0 rgba(0,0,0,.25);
      z-index: 1;

      /* Hide scrollbar for IE and MS Edge */
      -ms-overflow-style: none;
      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      &.active {
        display: block;
      }

      &__item {
        width: inherit;
        padding: 0 1em;
        font-size: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        transition: .1s background-color ease-out;
        cursor: pointer;
        text-transform: capitalize;
        color: rgba(0, 0, 0, .5);

        &:hover {
          color: rgba(0, 0, 0, .75);
          background: rgba(0, 0, 0, .1);
        }
      }
    }
  }
</style>