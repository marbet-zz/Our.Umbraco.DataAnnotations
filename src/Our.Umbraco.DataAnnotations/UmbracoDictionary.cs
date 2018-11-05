﻿using Umbraco.Core;
using Umbraco.Web;

namespace UmbracoBootstrap.DataAnnotations
{
    public class UmbracoDictionary
    {
        private static UmbracoHelper _helper;

        private static UmbracoHelper Helper
        {
            get
            {
                if (_helper == null)
                {
                    _helper = new UmbracoHelper();
                }
                return _helper;
            }
        }

        public static string GetDictionaryValue(string dictionaryKey)
        {
            //var localizationService = ApplicationContext.Current.Services.LocalizationService;
            //var item = localizationService.GetDictionaryItemByKey(dictionaryKey);
            // 

            string key = Helper.GetDictionaryValue(dictionaryKey);
            if (!string.IsNullOrEmpty(key))
                return key;
            return dictionaryKey; // Fallback with the key name
        }
    }
}