#!/usr/bin/env bash

#对应文件夹名称数组，与git库的名称必须保持一致
FoldName=()
#git库url数组名
GitPath=()
#git库对应的tag，如果是master则置空不填
RefName=()

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_basepage"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_basepage.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_basetable"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_basetable.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_calendar"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_calendar.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_card"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_card.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_dialog"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_dialog.git"
RefName[LastIndex]="master"

# LastIndex=${#FoldName[*]}+1;
# FoldName[LastIndex]="zn_vue_ui_download"
# GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_download.git"
# RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_errorpage"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_errorpage.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_form"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_form.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_map"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_map.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_tabs"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_tabs.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_upload"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_upload.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_js_utl_dot"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_js_utl_dot.git"
RefName[LastIndex]="master"

LastIndex=${#FoldName[*]}+1;
FoldName[LastIndex]="zn_vue_ui_basefilter"
GitPath[LastIndex]="git@192.168.2.246:mobile-component/zn_vue_ui_basefilter.git"
RefName[LastIndex]="master"


IsJenkins=false
HOMEPATH=${PWD}/iview
#对每个库进行最新代码拉取
pullGitChange() {
    for ((i=1;i<=${#FoldName[*]};i++));
        do
        cd ${HOMEPATH}
        if [ -d ${FoldName[i]} ]; then
            echo "已经clone指定${FoldName[i]}"
            cd ${FoldName[i]}
            #如果指定ref,则checkout指定ref
            if [ ${RefName[i]} ]; then
                git fetch
                git checkout ${RefName[i]}
                if [ $? -ne 0 ]; then
                    exit 1
                fi
            else
            #默认切换master分支
                git fetch
                git checkout master
                if [ $? -ne 0 ]; then
                    exit 1
                fi
            fi

            #如果使用jenkins,则强制重置当前代码
            if [[ ${IsJenkins} == true ]]; then
                git checkout .
            fi

            git pull
        else
            git clone ${GitPath[i]}
            if [ ${RefName[i]} ]; then
                cd ${FoldName[i]}
                git fetch
                git checkout ${RefName[i]}
                if [ $? -ne 0 ]; then
                    exit 1
                fi
            fi
        fi
    done
}
#检查每个git库里是否有代码变更
checkGitChange() {
    cd ${HOMEPATH}
    for ((i=1;i<=${#FoldName[*]};i++));
        do
            cd ${FoldName[i]}
            echo $(pwd)
            result=$(git status -s)
            if [ -n "${result}" ]; then
                showError "有代码变更未提交"
                echo ${result}
            fi
            cd ${HOMEPATH}
    done
}
showError() {
    echo -e "\033[31m${1}\033[0m"
}
#检查参数
if [ $# == 0 ];then
    showError '参数为空'
    showError "使用ci.sh --check 检查本地未提交的代码"
    showError "使用ci.sh --pull 拉取远程代码"
    exit 1
fi
#创建本地iview文件夹
if [ -d ${HOMEPATH} ]; then 
    echo "iview文件夹已经存在"
else
    echo "创建iview文件夹"
    mkdir ${HOMEPATH}
fi
if [[ $NeedCheck == true ]] ; then
    echo 'checkGitChange'
    checkGitChange
fi 
#是否需要检查有未提交的代码的标志
NeedCheck=false
#是否需要拉取最新代码的标志
NeedPull=false

NeedPush=false
#检查是否需要发起merge request
NeedCheckMerge=false

fromBranch=master
toBranch=master

NeedIOSSetup=false

echo "=============================="
echo "=总共${#FoldName[*]}个git代码库需要拉取="
echo "=============================="
#检查传参

params=("$@")
for ((i=0;i<=$#; i++));

do 
    p=${params[$i]}
    echo p=$p 
    if [ "$p" == "--check" ];then
        NeedCheck=true
    fi 
    if [ "$p" == "--pull" ];then 
        NeedPull=true
    fi
done
#拉取远程库
if [[ $NeedPull == true ]] ; then
    git pull
    echo 'pullGitChange'
    pullGitChange
    #拉完代码后执行npm
    # npm install
fi