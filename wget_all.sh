#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function wget_all () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local VAR_SLOTS=(
    reso=,sd,mq,hq,maxres
    shot_num=0,1,2,3,default
    flag=,_live
    fext=.jpg
    )
  local VID_ID= BASE_URL=
  for VID_ID in "$@"; do
    BASE_URL="https://i3.ytimg.com/vi/$VID_ID/"
    vari '' "${VAR_SLOTS[@]}" || return $?
  done
}


function vari () {
  local SUB_FN="$1"; shift
  if [ -z "$*" ]; then
    save_one_img
    return $?
  fi
  local ADD="$1"; shift
  ADD="${ADD#*=}"
  local LIST=()
  readarray -t LIST <<<"${ADD//,/$'\n'}"
  for ADD in "${LIST[@]}"; do
    "$FUNCNAME" "$SUB_FN$ADD" "$@" || return $?
  done
}


function save_one_img () {
  local IMG_URL="$BASE_URL$SUB_FN"
  local DEST_FN="$VID_ID.$SUB_FN"
  echo -n "$DEST_FN <- $IMG_URL: "
  # echo stub; return 0
  if [ -L "$DEST_FN" -o -s "$DEST_FN" ]; then
    echo 'skip: have.'
    return 0
  fi
  local DL_TMP="tmp.$$.$DEST_FN"
  wget --output-document="$DL_TMP" -- "$IMG_URL"
  local WGET_RV=$?
  case "$WGET_RV" in
    0 )
      mv --verbose --no-target-directory -- "$DL_TMP" "$DEST_FN" || return $?
      ;;
    8 )
      rm -- "$DL_TMP"
      ln --symbolic --no-target-directory -- /dev/null "$DEST_FN" || return $?
      return 0;;
  esac
  echo "E: wget failed: rv=$WGET_RV" >&2
  return "$WGET_RV"
}










wget_all "$@"; exit $?
