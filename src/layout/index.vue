<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{'hasTagView': needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-show="needTagsView" />
      </div>
      <app-main />
      <right-panel v-show="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
  import RightPanel from '../components/RightPanel'
  import { AppMain, Settings, Sidebar, TagsView, Navbar } from './components'
  import { mapState } from 'vuex'
  export default {
	name: 'Layout',
	components: { RightPanel, AppMain, Settings, Sidebar, TagsView, Navbar },
	computed: {
	  ...mapState({
		fixedHeader: state => state.settings.fixedHeader,
		showSettings: state => state.settings.showSettings,
		needTagsView: state => state.settings.tagsView
	  })
	}
  }
</script>

<style lang="scss" scoped>
    @import "../styles/mixin";
    @import "../styles/variables";

    #app .sidebar-container{
      font-size: 0px;
    }
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
