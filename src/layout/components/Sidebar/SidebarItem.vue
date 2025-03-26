<template>
  <div v-if="!itemRoute.hidden">
    <template
      v-if="
        hasOneShowingChild(itemRoute.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !itemRoute.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="
              onlyOneChild.meta.icon || (itemRoute.meta && itemRoute.meta.icon)
            "
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(itemRoute.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="itemRoute.meta"
          :icon="itemRoute.meta && itemRoute.meta.icon"
          :title="itemRoute.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in itemRoute.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    itemRoute: function() {
      if (this.item.children) {
        this.item.children.forEach((el, i) => {
          if (el.meta) {
            if (el.meta.roles) {
              if (!el.meta.roles.includes('test')) {
                this.item.children.splice(i, 1)
              }
            }
          }
        })
      }
      return this.item
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (this.itemRoute.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
