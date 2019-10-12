﻿using Our.Umbraco.DataAnnotations.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Our.Umbraco.DataAnnotations
{
    public sealed class UmbracoRangeAttribute : RangeAttribute, IClientValidatable, IUmbracoValidationAttribute
    {
        public string DictionaryKey { get; set; } = "RangeError";

        public UmbracoRangeAttribute(int minimum, int maximum) 
            : base(minimum, maximum)
        {
            ErrorMessage = UmbracoDictionary.GetDictionaryValue(DictionaryKey);
        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            yield return
                new ModelClientValidationRangeRule(FormatErrorMessage(metadata.GetDisplayName()), Minimum, Maximum);
        }
    }
}
