self.__BUILD_MANIFEST = {
  "/_error": [
    "./static/chunks/pages/_error.js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/clinicaltables/:path*"
      },
      {
        "source": "/api/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/SignInPage",
    "/SignUpPage",
    "/SuccessPage",
    "/WelcomePage",
    "/_app",
    "/_error",
    "/symptoms/SymptomChartsPage",
    "/symptoms/SymptomLogTypePage",
    "/symptoms/SymptomLoggedPage",
    "/symptoms/SymptomMoodPage",
    "/symptoms/SymptomSelectPage",
    "/symptoms/SymptomsHomePage",
    "/symptoms/SymptomsLayout"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()