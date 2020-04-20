import template from '@/views/template.vue'
import antdesign from '@/views/antdesign.vue'
import sidebar_blog from '@/components/sidebar_blog.vue'
import sidebar_petstore from '@/components/sidebar_petstore.vue'

const routers = [

    {
        path: '/login',
        meta: {
            title: '登录',
        },
        name:"login",
        component: (resolve) => require(['@/views/login.vue'], resolve)
    },
    
    {
        path: '/antdesign',
        meta: {
            title: 'ant',
        },
        name:"ant",
        component: antdesign,
        children:[
          {
            path: 'demo1',
            meta: {
                title: 'demo1',
            },
            name:"demo1",
            components: {
              default: (resolve) => require(['@/views/antdesign/demo1.vue'], resolve),
            }
          }

        ]
    },
    
    
    
    {
        path: '/blog',
        redirect: { name: 'posts' },
        meta: {
            title: '博客',
            requireAuth: true,
        },
        name:"blog",
        component: template,
        children:[
          {
            path: 'posts',
            meta: {
                title: '文章列表',
                requireAuth: true,
            },
            name:"posts",
            components: {
              default: (resolve) => require(['@/views/blog/posts.vue'], resolve),
              sidebar: sidebar_blog
            }
          },
          {
            path: 'addSingle',
            meta: {
                title: '添加文章',
                requireAuth: true,
            },
            name:"addSingle",
            components: {
              default: (resolve) => require(['@/views/blog/addSingle.vue'], resolve),
              sidebar: sidebar_blog
            }
          },
          {
            path: 'spider',
            meta: {
                title: '网络爬虫',
                requireAuth: true,
            },
            name:"spider",
            components: {
              default: (resolve) => require(['@/views/blog/spider.vue'], resolve),
              sidebar: sidebar_blog
            }
          },
        ]
    },
    {
        path: '/petStore',
        redirect: { name: 'products' },
        meta: {
            title: '宠物商店',
            requireAuth: true,
        },
        name:"petStore",
        component: template,
        children:[
          {
            path: 'products',
            meta: {
                title: '商品中心',
                requireAuth: true,
            },
            name:"products",
            components: {
              default: (resolve) => require(['@/views/petStore/products.vue'], resolve),
              sidebar: sidebar_petstore
            }
          },
          {
            path: 'cart',
            meta: {
                title: '购物车',
                requireAuth: true,
            },
            name:"cart",
            components: {
              default: (resolve) => require(['@/views/petStore/cart.vue'], resolve),
              sidebar: sidebar_petstore
            }
          },
          {
            path: 'orders',
            meta: {
                title: '订单中心',
                requireAuth: true,
            },
            name:"orders",
            components: {
              default: (resolve) => require(['@/views/petStore/orders.vue'], resolve),
              sidebar: sidebar_petstore
            }
          },
          {
            path: 'ordersDetails',
            meta: {
                title: '订单详情',
                requireAuth: true,
            },
            name:"ordersDetails",
            components: {
              default: (resolve) => require(['@/views/petStore/ordersDetails.vue'], resolve),
              sidebar: sidebar_petstore
            }
          },
        ]
    },


    {
        path: '*',
        redirect: '/blog/posts'
    },
]

export default routers
