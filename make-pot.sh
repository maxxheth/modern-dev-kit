#!/bin/bash

for arg in "$@"
do
    case $arg in 
        -t=*|--theme-name=*)
        theme_name="${arg#*=}"
        shift
        ;;
        -p=*|--plugin-name=*)
        plugin_name="${arg#*=}"
        shift
        ;;
    esac
done

wp i18n make-pot . languages/"$theme_name".pot
wp i18n make-pot . languages/"$plugin_name".pot