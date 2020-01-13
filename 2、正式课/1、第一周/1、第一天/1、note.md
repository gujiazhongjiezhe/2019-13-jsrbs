# 第一天笔记
 git pull origin master --allow-unrelated-histories（如果pull的时候失败，就输入这个）

## git版本控制系统
- 1、git(版本控制系统); 到底什么是git，到底什么是版本控制系统，他是干嘛的呢？
    + 记录历史版本信息（记录每一次修改的记录）
    + 方便团队相互之间协作开发

- 国内常用的版本控制系统
    + cvs/svn：集中式版本控制系统
    + git：分布式版本控制系统
    + 画图看一下集中式和分布式的区别和特点

- 2、git的安装
    >git的官网   https://git-scm.com/downloads

    > 带领学生们安装git，
    出来那两个git选项（或者在终端执行git --version）
    ------------以上只是针对于window电脑的，ios的请看下边-----------

    > mac电脑安装：
        + 1、http://brew.sh/
        + 粘贴  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  在你的电脑终端里输入这句话，Homebrew就安装成功了，
        + 在终端执行$ brew install git   这是安装git  （sudo）

- 3、git的工作原理
    + 工作区：我们能看到的，平时用来写代码的地
    + 暂存区：临时存储用的
    + 历史区：生成历史版本

    工作区->暂存区->历史区（画图）

- 4、git的使用（全局配置）
    > git的全局的配置只需要配置一次就好（git第一次安装完成后，我们在全局环境下基本信息）

    + 1、配置全局基础信息
    git config -l   (查看全局配置信息) 【有的同学报错不用管，直接输入用户名和邮箱】

    git config --global user.name 'xxx'
    git config --blobal user.email 'xxx@xxx.xxx'

    -------------到目前为止同学们输入git config --global -l要出来用户名和邮箱-------

    + 2、创建仓库，完成版本控制
        + 1、创建本地仓库
        git init（会生成一个隐藏文件夹，不能删除，仓库里边的所有信息都在这里边）【mac的在终端输入shift+cmmand+. 直接显示】

        + 2、在本地工作区编写完成代码之后，把代码提交到暂存区
        git add xxx  (把工作区指定的文件提交到暂存区)
        git add . (把工作区所有修改的文件提交到暂存区)
        git add -A (把工作区所有修改的文件提交到暂存区)
        git status (查看当前文件提交状态) 【红色代表在工作区；绿色代表在暂存区；看不见东西代表所有东西已经提交到历史区】

        + 3、把暂存区的内容提交到历史区
        git commit -m'描述信息'  （描述信息是本次提交的一个描述）

        git log  查看历史版本信息
        git reflog 包含回滚的历史信息
    
- 5、github  网址： https://github.com 

    > 一个网站（一个开源的源代码管理平台），用户注册后，可以在自己的账户下创建远程仓库，用来管理自己的源代码（代码是基于git传到远程仓库中）
    > 我们所熟知的插件、类库的源码在这个平台上都有所托管（我们可以下载、查看）

    1、在头像下的Settings
        + Profile：设置昵称、公开的邮箱、简介、头像
        + account：设置用户名（登录名）、
        + security：修改密码

    2、创建仓库
        + new repository
            + publice：创建一个开源的仓库
            + peivate：私有仓库作为团队内部开发
        + 填写信息
        + create repository
        + 仓库的settings
            + delete this repository（删除库）
            + Collaborators 设置仓库的管理者

    3、把本地仓库的代码提交到远程仓库
        + 本地仓库和远程仓库建立连接
            + git remote -v (查看本地仓库和远程仓库的连接状态)
            + git remote add origin git仓库地址 (让本地仓库和远程仓库建立连接) origin是随便起的连接名（可以改，不过一般大家都叫这个名字）
            + git remote rm origin (删除连接状态)

        + 向远程仓库提交代码（提交之前先拉取代码）
            + git pull origin master (拉取代码，把远程仓库代码拉取到本地)
            + git push origin master (推送代码，把本地代码推送到远程)
    
- 5、git clone 远程仓库git地址  本地仓库名
    + 其实在真正开发的时候我们用的都是git clone
      2、小组成员基于 git clone 把仓库克隆到本地（一步就干三件事：git init、git remote add、git pull）



