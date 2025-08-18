# Nx

Nx is a powerful, open source, technology-agnostic **build platform** designed to efficiently **manage codebases** of any scale.

Nx 是一个功能强大、开源、并且与技术无关的 **构建平台**，旨在高效管理任何规模的代码库。

## 介绍

随着团队和代码库的扩大，生产力瓶颈也会成倍增加：**构建时间变长、持续集成变得不可靠，代码共享也变得复杂**。

Nx 就是用来解决这些问题的一个构建工具。

### Nx Core

Nx 采用模块化构建方式，在开发生命周期的任何阶段，都可以根据需要酌情采用。其核心 Nx Core 是一个基于 Rust 语言、与技术无关的 **任务运行器**，它可以为工作区创建一个知识图谱(graph)，从而更好地了解项目之间的关系和依赖项。

推荐的做法是从 Nx 核心功能起步，随着需求增长和复杂度提升，再逐步添加更多功能。

> 与技术无关的意思是：Nx 不仅可以用来运行 npm 命令，还可以在 Java 项目中运行 Gradle 任务。

Nx Core 单独使用就很棒，但 Nx 的强大之处远远不止如此。

- 还可以通过远程缓存和分布式任务执行，借助 Nx Cloud 加快持续集成速度。
- Nx Plugin 实现特定技术的自动化和开发体验改进
- Nx Devkit 构建自定义功能

### Nx Console

Nx Console 是一个 VSCode 扩展插件，它可以将 Nx 与编辑器进行集成，提供强大的自动补全支持、项目图可视化、持续集成运行通知，以及一个让 AI 编码助手更智能的元代码程序(MCP)

## 安装

最简单的方法就是通过 npm 进行安装当然也有其他的安装方式，就去看官网吧。

```bash
pnpm add nx -D
```

### 将 Nx 添加到仓库

#### 将 Nx 添加到现有仓库

```bash
pnpm exec nx init
```

然后会出现交互式问答，到时候需要讲一下这些什么意思，反正就是按照提示来。

#### 创建一个新仓库

```bash
npx create-nx-workspace@latest
```

然后也会出现一系列的交互问答，具体就是问一些创建什么项目啥的

### 更新 Nx

Nx 的安装会锁版本，如果要更新 Nx 需要使用 Nx 提供的命令，它会自动更新 NX 的依赖项

```bash
nx migrate latest
```

## 功能

### 任务

在 menorepo 仓库设置中，通常不只是为单个项目运行任务，可能需要管理数百个项目。为了提供帮助，Nx 提供了一个强大的任务运行器，能够：

- 轻松地并行运行多个项目
- 定义任务管道，以便按正确顺序运行任务
- 仅针对受特定变更影响的任务运行任务
- 使用缓存加快任务执行速度

#### 运行单个任务

![](https://nx.dev/documentation/shared/images/run-target-syntax.svg)

要为header项目运行test任务，请运行以下命令：

```bash
npx nx test header
```

#### 运行多个任务

`-t` 表示命令 task，`-p` 表示项目 project

可以使用 run-many 命令为多个项目运行任务。以下是几个示例。

```bash
npx nx run-many -t build
```

运行仓库中所有项目的 build、lint 和 test 任务：

```bash
npx nx run-many -t build lint test
```

仅在header和footer项目上运行build、lint和test任务：

```bash
npx nx run-many -t build lint test -p header footer
```

Nx 将遵循任务管道配置，把这些任务并行化，确保它们根据依赖关系按准确顺序运行。还可以控制一次并行运行的任务数量。

#### 运行受改动的项目

还可以通过 `affected` 指令来运行被改动项目的命令：

```bash
npx nx affected -t test
```

### 管道

任务之间存在依赖关系是很常见的，这就要求一个任务在另一个任务之前运行。例如，你可能希望在对 app 项目运行 build 目标之前，先对 header 项目运行 build 目标。

Nx 可以自动检测项目之间的依赖关系，然而，你需要指定这种顺序对哪些目标很重要。在下面的示例中，我们告诉Nx，在运行build目标之前，它需要在当前项目所依赖的所有项目上运行build目标：

```js
"targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
    }
  },
```

可能就是会根据依赖关系启动命令把，没太明白这块

## 代码生成器

生成器是 Nx 插件 的一部分，可以使用 `nx generate` 命令（或 `nx g`），按照以下语法调用：`nx g <plugin-name>:<generator-name> [options]`。

最重要的是可以构建自己的生成器。

## 后续

- Nx 核心，缓存、管道的概念
- Nx Plugin
- Nx 与模块联邦
- Nx Cloud 最后吧

Nx 的文章：https://juejin.cn/user/4353721774379054/posts
