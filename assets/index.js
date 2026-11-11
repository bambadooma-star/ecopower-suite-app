/* EcoPower Suite — landing page logic: i18n (EN/HE), interactive simulator, savings calculator,
   copy/share helpers, local-only page stats, GitHub download counter. No tracking, no third parties
   except the optional public GitHub releases API call for the download counter. */
(function () {
  'use strict';
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = (window.EcoCommon && window.EcoCommon.store) || {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  /* =====================================================================
     i18n — English lives in the HTML; Hebrew lives here.
     ===================================================================== */
  var HE = {
    'skip': 'דלגו לתוכן הראשי',
    'nav.demo': 'הדגמה', 'nav.features': 'יכולות', 'nav.shield': 'הגנה מהפרעות', 'nav.calc': 'מחשבון חיסכון', 'nav.security': 'אבטחה', 'nav.faq': 'שאלות נפוצות',
    'support': 'תמיכה', 'support.title': 'תמיכה במפתח ב־PayPal', 'support.long': 'תמיכה במפתח ב־PayPal',
    'download': 'הורדה', 'menu': 'תפריט', 'dl.long': 'הורדה חינם · v1.1.4 · Windows 64 סיביות',
    'hero.pill': 'חינמית · פרטית · בלי פרסומות',
    'hero.h1': 'צמצמו את צריכת החשמל של המחשב <span class="grad-text">עד 40%</span>',
    'hero.lead': 'תוכנה שעוזרת למחשב לצרוך פחות חשמל: מצבי הספק, עמעום מסכים, כיבוי מתוזמן ומעקב אחר החיסכון. בלי פרסומות ובלי מעקב.',
    'hero.cta': 'הורדה ל־Windows', 'hero.demo': 'לניסוי ההדגמה',
    'hero.m1': 'Windows 10 ו־11 (64 סיביות)', 'hero.m2': 'קובץ אחד, בלי התקנה', 'hero.m3': 'בלי פרסומות ובלי מעקב', 'hero.downloads': 'הורדות ב־GitHub',
    'hero.fine': 'החיסכון המוצג הוא הערכה. התוצאה בפועל תלויה במחשב, בשימוש ובתעריף החשמל שלכם.',
    'trust.1': 'מחשבים נייחים ולפטופים', 'trust.2': 'תמיכה בכמה מסכים', 'trust.3': 'Intel ו־AMD (‏x64)', 'trust.4': 'עובדת בלי אינטרנט, חוץ מעדכונים',
    'demo.eyebrow': 'הדגמה אינטראקטיבית', 'demo.title': 'כך האפליקציה עובדת',
    'demo.lead': 'החליפו מצב, הזיזו את הבהירות או דמו זמן סרק, וראו איך משתנים ההספק והחיסכון. המספרים להמחשה בלבד.',
    'demo.jump': 'חשבו כמה תחסכו לפי המחשב והמסכים שלכם',
    'feat.eyebrow': 'הכול בחלון אחד', 'feat.title': 'פחות חשמל, בלי מאמץ',
    'feat.lead': 'האפליקציה פועלת בשקט ברקע ומשנה הגדרות רק כשצריך.',
    'f1.t': 'שלושה מצבים', 'f1.p': '<strong>Eco</strong> מגביל את המעבד ומעמעם את המסך ל־10%. <strong>Balanced</strong> הוא מצב היומיום, עם בהירות 80%. <strong>Max Performance</strong> נותן ביצועים מלאים ובהירות 100%.',
    'f2.t': 'מצב חיסכון בזמן סרק', 'f2.p': 'אחרי 2 עד 60 דקות בלי פעילות (לפי מה שתבחרו) המחשב עובר ל־Eco. כשנוגעים בעכבר או במקלדת הוא חוזר למצב הקודם.',
    'f3.t': 'כל המסכים, מחוון אחד', 'f3.p': 'שולטת בבהירות של מסכים חיצוניים (DDC/CI) ושל מסך הלפטופ, בבת אחת.',
    'f4.t': 'לא מפריעה בזמן עבודה', 'f4.p': 'היא לא מעמעמת בזמן שיחת וידאו, סרט, משחק או עבודת AI מקומית. כשהיא מזהה פעילות כזו, ספירת הסרק נעצרת.',
    'f5.t': 'כיבוי מתוזמן', 'f5.p': 'אתם בוחרים שעה, ובכל יום בשעה הזו מופיעה התראה של 30 שניות. אפשר לדחות בשעה או לבטל להיום. אם לא בחרתם שעה, האפליקציה תשאל. ההגדרה נשמרת גם אחרי עדכון או מחיקה של הקובץ.',
    'f6.t': 'מעקב חיסכון', 'f6.p': 'כמה קוט״ש וכסף נחסכו היום, ב־12 החודשים האחרונים, ומה צפוי ב־12 החודשים הבאים, לפי המטבע והתעריף שלכם.',
    'hw.eyebrow': 'מתאימה לכל מחשב', 'hw.title': 'עובדת על כל מחשב Windows',
    'hw.lead': 'מחשב גיימינג, תחנת עבודה עם שני מסכים או לפטופ על סוללה: אותו קובץ, בלי הבדל.',
    'hw1.t': 'מחשבים נייחים', 'hw1.p': 'שליטה בבהירות המסכים דרך HDMI ו־DisplayPort, וצריכה נמוכה יותר כשהמחשב לא בשימוש.',
    'hw2.t': 'לפטופים', 'hw2.p': 'שליטה במסך המובנה. כשמנתקים מהחשמל, המחשב עובר פעם אחת ל־<strong>Balanced</strong> כדי לשמור על הסוללה.',
    'hw3.t': 'כמה מסכים', 'hw3.p': 'היא מזהה כל מסך מחובר ומכוונת את כולם יחד, וכך החיסכון גדל.',
    'hw4.t': 'Intel ו־AMD', 'hw4.p': 'גרסת 64 סיביות ל־Windows 10 ו־11. ב־Windows על ARM היא רצה באמולציה, ויכולות החומרה עשויות להיות מוגבלות.',
    'how.eyebrow': 'איך זה עובד', 'how.title': 'שלושה צעדים, בלי התקנה',
    's1.t': 'מורידים ומפעילים', 's1.p': 'מורידים את הקובץ <code>EcoPowerSuite.exe</code> ולוחצים עליו פעמיים. הוא נפתח באזור ההודעות במצב Balanced.',
    's2.t': 'בוחרים מצב או משאירים לה', 's2.p': 'מחליפים מצב בלחיצה. במצב הסרק האוטומטי היא עוברת ל־Eco כשמתרחקים וחוזרת כשחוזרים.',
    's3.t': 'רואים כמה חסכתם', 's3.p': 'במסך החיסכון רואים קוט״ש וכסף לפי התעריף שלכם.',
    'sh.eyebrow': 'בלי הפרעות', 'sh.title': 'הגנה מעמעום בזמן עבודה',
    'sh.lead': 'המתזמנים הרגילים של Windows עלולים לעמעם את המסך באמצע סרט או שיחה. EcoPower Suite בודקת שמע, מסך מלא ושלט משחק, ולא מעמעמת כשיש פעילות.',
    'sh1.t': 'וידאו במסך מלא', 'sh1.p': 'YouTube, ‏Netflix, ‏Disney+‎, ‏VLC ומצגות, בכל מסך.',
    'sh2.t': 'שמע פעיל', 'sh2.p': 'כשיש שמע ב־Spotify, ‏Zoom, ‏Discord או Teams, המחשב נשאר ער.',
    'sh3.t': 'שלט משחק', 'sh3.p': 'משחקים עם שלט Xbox או PlayStation בלי עכבר? הקלט מהשלט נחשב לפעילות.',
    'sh4.t': 'עבודת AI מקומית', 'sh4.p': 'היא מזהה הרצה מקומית (<strong>Ollama, ‏LM Studio, ‏ComfyUI, ‏llama.cpp, ‏Whisper</strong>) ועומס GPU של NVIDIA מעל 15%, ולכן לא תפריע לעבודה כזו.',
    'sh5.t': 'שליטה משורת הפקודה', 'sh5.p': 'אפשר לשלוט באפליקציה מסקריפטים ומסוכני AI, בלי חלון, עם פלט JSON: <code>--status --json</code>, ‏<code>--mode &lt;eco|balanced|perf&gt;</code>, ‏<code>--brightness &lt;0-100&gt;</code>.',
    'calc.eyebrow': 'כמה אפשר לחסוך', 'calc.title': 'מחשבון חיסכון',
    'calc.lead': 'בחרו את סוג המחשב ומספר המסכים. תחנות עבודה ומחשבי גיימינג חוסכים הכי הרבה. התוצאות הן הערכה.',
    'calc.rig': '1. סוג המחשב', 'rig.regular': 'משרדי', 'rig.mid': 'תחנת עבודה', 'rig.great': 'גיימינג', 'rig.ultra': 'קצה עליון',
    'calc.mon': '2. מספר המסכים', 'mon.1': 'מסך אחד', 'mon.2': '2 מסכים', 'mon.3': '3 מסכים', 'mon.4': '4 מסכים ומעלה',
    'calc.monnote': 'עמעום המסך והשבתתו בזמן סרק חוסכים בערך 18 עד 28 ואט לכל מסך.',
    'calc.cur': 'מטבע', 'calc.hours': 'שעות סרק ביום', 'calc.rate': 'תעריף חשמל',
    'calc.shut': 'כולל כיבוי אוטומטי בלילה (8 שעות)',
    'calc.proj': 'חיסכון שנתי צפוי', 'calc.kwh': 'אנרגיה שנחסכת בשנה', 'calc.co2': 'פחות CO₂', 'calc.trees': 'שווה ערך לעצים שניטעו',
    'new.title': 'מה חדש בגרסה 1.1.4', 'new.lead': 'מסכים נקיים וקריאים, כיבוי מתוזמן שנשמר, ועדכונים אוטומטיים.',
    'n1.t': 'מראה חדש', 'n1.a': '<b>טקסט גדול וברור</b>, וכל מסך נכנס בחלון בלי גלילה', 'n1.b': '<b>לוגו חדש</b> וקליל יותר',
    'n2.t': 'כיבוי מתוזמן', 'n2.a': '<b>אתם קובעים את השעה.</b> אם לא קבעתם, האפליקציה תשאל', 'n2.b': '<b>ההגדרה נשמרת</b> גם אחרי עדכון או מחיקה של הקובץ',
    'n3.t': 'בהירות ותיקונים', 'n3.a': 'בהירות לפי מצב: <b>Eco‏ 10%, Balanced‏ 80%, Max‏ 100%</b>', 'n3.b': 'תוקן: הבהירות משתנה גם <b>במסך הלפטופ</b>', 'n3.c': 'חישוב חדש: <b>12 החודשים האחרונים</b> ותחזית ל־12 הבאים',
    'n3.d': '<b>דחיית הכיבוי</b> באמת מתזמנת מחדש', 'n3.e': 'שורת פקודה: <code>--status</code> מזהה Eco נכון',
    'n4.t': 'עדכונים', 'n4.a': '<b>עדכונים אוטומטיים תמיד</b>, בלי לשאול', 'n4.b': 'כל עדכון נבדק לפני ההתקנה (גודל, תקינות ו־SHA-256)',
    'spec.eyebrow': 'פרטים טכניים', 'spec.title': 'מפרט', 'spec.lead': 'קלה, ניידת, ומשתמשת בממשקי Windows הרשמיים.',
    'spec.os': 'מערכת הפעלה', 'spec.arch': 'ארכיטקטורה', 'spec.size': 'גודל קובץ', 'spec.ver': 'גרסה', 'spec.net': 'שימוש ברשת', 'spec.netv': 'רק עדכונים מ־GitHub',
    'spec.ipc': 'מופע יחיד', 'spec.ddc': 'בהירות במסך חיצוני', 'spec.wmi': 'בהירות בלפטופ', 'spec.aspm': 'חיסכון ב־PCIe', 'spec.aspmv': 'מרבי ב־Eco', 'spec.auto': 'הפעלה עם Windows',
    'sec.eyebrow': 'אבטחה', 'sec.title': 'פרטית, ואפשר לבדוק אותה',
    'sec.lead': 'אין בה מעקב, חשבונות או פרסומות. היא פונה לרשת רק כדי לבדוק ולהוריד עדכונים מ־GitHub.',
    'sc1.t': 'בדקו בעצמכם', 'sc1.p': 'חפשו את ה־SHA-256 שלמטה ב־VirusTotal, או העלו לשם את הקובץ ותנו לעשרות מנועי אנטי־וירוס לבדוק אותו. השוו את ה־hash למה שהורדתם.',
    'sc1.a': 'חיפוש ה־hash ב־VirusTotal', 'sc1.b': 'העלאת קובץ לבדיקה',
    'sc2.t': 'עובדת מקומית', 'sc2.p': 'בלי מעקב, בלי מזהים אישיים ובלי העלאת נתונים. שליטת ההספק עובדת דרך ממשקי Windows מקומיים. הפעילות היחידה ברשת היא בדיקת עדכונים והורדה מ־GitHub, והעדכון נבדק לפני שהוא מותקן.',
    'sc2.s': 'פעילות ברשת', 'sc2.v': 'רק GitHub, רק עדכונים',
    'sc3.t': 'לא משאירה שינויים מיותרים', 'sc3.p': 'בלי דרייברים ובלי שינויי מערכת קבועים. היא משתמשת רק בכלים רשמיים של Windows (<code>powercfg</code>, ‏<code>dxva2.dll</code>, ‏WMI). הכפתור <strong>יציאה ושחזור</strong> מחזיר את תוכנית ההספק ל־Balanced.',
    'sc3.s': 'הסרה', 'sc3.v': 'כיבוי הכיבוי המתוזמן, יציאה ומחיקת הקובץ',
    'sc4.t': 'חינמית, בלי תנאים', 'sc4.p': 'האפליקציה חינמית. הפיתוח נתמך בתרומות מרצון, בלי פרסומות, בלי כורי מטבעות ובלי מעקב. אם היא חוסכת לכם כסף, אפשר לקנות למפתח קפה.',
    'sc4.a': 'תמיכה ב־PayPal',
    'zb.t': 'שלוש דרכים לבדוק את הקובץ', 'zb.p': 'לפני שמפעילים את <code>EcoPowerSuite.exe</code>, אפשר לבדוק אותו בעצמכם:',
    'zb.1k': 'שלב 1 · סריקה', 'zb.1t': 'VirusTotal', 'zb.1p': 'העלו את הקובץ, או חפשו לפי ה־hash שלו, וראו מה אומרים מנועי האנטי־וירוס.',
    'zb.2k': 'שלב 2 · SHA-256', 'zb.2t': 'בדיקת hash', 'zb.2p': 'חשבו hash לקובץ שהורדתם והשוו אותו לזה שבדף הזה ובדף הגרסה ב־GitHub.',
    'zb.3k': 'שלב 3 · מקור', 'zb.3t': 'רק מקור רשמי', 'zb.3p': 'הורידו רק מדף הגרסאות ב־GitHub או מהאתר הזה.', 'zb.3a': 'פתיחת דף הגרסאות ↗',
    'vc.t': 'בדיקת SHA-256 במחשב', 'vc.p': 'פתחו PowerShell בתיקיית ההורדה והריצו:',
    'ss.t': 'למה Windows כותב "מפרסם לא ידוע"?',
    'ss.p1': 'התוכנה אינה חתומה דיגיטלית, כי חתימה כזו עולה הרבה כסף בשנה. לכן Windows עשוי להציג אזהרה בהפעלה הראשונה.',
    'ss.p2': '<strong>מה עושים:</strong> לוחצים <u>מידע נוסף</u> ואז <u>הפעל בכל זאת</u>, אחרי שוידאתם שה־SHA-256 שלמעלה זהה לקובץ שהורדתם.',
    'dl.title': 'רוצים לחסוך בחשמל?', 'dl.lead': 'בלי התקנה, בלי פרסומות ובלי מעקב. מורידים ולוחצים פעמיים.',
    'dl.btn': 'הורדת EcoPowerSuite.exe (v1.1.4)', 'dl.mirror': 'הורדה ישירה מהאתר',
    'share.eyebrow': 'שתפו', 'share.title': 'שתפו את EcoPower Suite',
    'share.lead': 'מכירים מישהו שהמחשב שלו חם, או מבזבז חשמל בלילה? שלחו לו את הקישור.', 'share.btn': 'שיתוף הדף',
    'faq.title': 'שאלות נפוצות',
    'q1.q': 'מה קורה בלפטופ כשמנתקים מהחשמל?', 'q1.a': 'האפליקציה מזהה את הניתוק ועוברת פעם אחת ל־<strong>Balanced</strong>. כך הסוללה נשמרת, בלי עמעום חד ל־10%.',
    'q2.q': 'האם היא תפריע לי בסרט או במשחק?', 'q2.a': 'לא. היא בודקת שמע, מסך מלא, שלט משחק ועבודת AI מקומית. כל עוד יש פעילות כזו, מצב הסרק לא מופעל.',
    'q3.q': 'האם היא תומכת בכמה מסכים?', 'q3.a': 'כן. היא מזהה כל מסך שמחובר ב־HDMI, ‏DisplayPort או USB-C ומכוונת את הבהירות שלו, וגם את מסך הלפטופ.',
    'q4.q': 'איך היא עולה עם Windows?', 'q4.a': 'כברירת מחדל היא נרשמת תחת <code>HKCU\\…\\CurrentVersion\\Run</code> עם הדגל <code>--minimized</code>, ועולה בשקט לאזור ההודעות. בכל הפעלה היא בודקת שהרישום עדיין תקין. אפשר לכבות זאת בהגדרות.',
    'q5.q': 'האם היא מתחברת לאינטרנט?', 'q5.a': 'רק כדי לבדוק ולהוריד עדכונים מ־GitHub. הבדיקה נעשית בהפעלה ואחת ל־6 שעות, והעדכון מותקן אוטומטית אחרי בדיקת תקינות. אין מעקב.',
    'q6.q': 'האם היא משנה את הגדרות Windows?', 'q6.a': 'כן, אבל רק את מה שקשור לחשמל: תוכניות הספק, מעבד, חיסכון ב־PCIe, כיבוי מסך ובהירות. <strong>יציאה ושחזור</strong> בהגדרות מחזיר ל־Balanced.',
    'q7.q': 'האם היא חינמית? האם הקוד פתוח?', 'q7.a': 'היא חינמית, בלי פרסומות, ונתמכת בתרומות. הקוד סגור, ולכן אנחנו מפרסמים סכום בדיקה ואפשר לסרוק את הקובץ בעצמכם.',
    'q8.q': 'איך מסירים אותה?', 'q8.a': 'אין מתקין. בהגדרות לוחצים <em>יציאה ושחזור</em>. אם קבעתם כיבוי מתוזמן, כבו אותו קודם במסך הכיבוי המתוזמן (ההגדרה נשמרת גם אחרי מחיקת הקובץ), ואז מוחקים את הקובץ. אפשר לכבות גם את "הפעלה עם Windows".',
    'foot.tag': 'חיסכון באנרגיה ובסוללה ל־Windows', 'foot.sec': 'אבטחה ובדיקה', 'foot.pp': 'תמיכה במפתח', 'foot.share': 'שיתוף', 'foot.stats': 'סטטיסטיקת דף',
    'foot.terms': 'תנאי שימוש ורישיון', 'foot.priv': 'מדיניות פרטיות', 'foot.cookie': 'עוגיות ואחסון',
    'legal.h': 'הודעה משפטית והגבלת אחריות',
    'legal.p1': 'EcoPower Suite ניתנת "כמות שהיא" (AS-IS), בלי אחריות מכל סוג. נתוני החיסכון (קוט״ש, הספק, CO₂ ועלות) הם הערכות בלבד. תעריפי החשמל והיעילות בפועל משתנים מאוד.',
    'legal.p2': 'במידה המרבית שהחוק מתיר, היוצר והמפיצים אינם אחראים לנזק ישיר או עקיף, כולל תקלת חומרה, הבהוב מסך, אובדן נתונים, כיבוי המחשב או הפרשים בחשבון החשמל. השימוש בתוכניות הספק ובעמעום מסכים הוא על אחריותכם.',
    'legal.p3': 'כפוף לדיני מדינת ישראל, וסמכות השיפוט הבלעדית בתל אביב־יפו. Windows, ‏Intel, ‏AMD, ‏NVIDIA ושאר הסימנים שייכים לבעליהם. EcoPower Suite עצמאית ואינה קשורה ל־Microsoft.',
    'foot.copy': '© 2026 זיו שבת. כל הזכויות שמורות. תוכנה חינמית שנבנתה מתוך הקפדה על פרטיות.',
    'st.title': 'סטטיסטיקת דף, בדפדפן הזה בלבד', 'st.sub': 'מונים אנונימיים שנשמרים ב־localStorage אצלכם. שום דבר לא נשלח.',
    'st.gh': 'הורדות ב־GitHub', 'st.clicks': 'לחיצות על הורדה', 'st.visits': 'ביקורים', 'st.conv': 'לחיצות מתוך ביקורים', 'st.ref': 'מקורות הגעה', 'st.dev': 'מכשיר',
    'st.sim': 'שימוש בהדגמה', 'st.calc': 'שימוש במחשבון', 'st.share': 'לחיצות שיתוף', 'st.hash': 'העתקות hash',
    'st.export': 'ייצוא JSON', 'st.sync': 'עדכון מספר ההורדות', 'st.reset': 'איפוס הנתונים',
    'meta.title': 'EcoPower Suite — חיסכון באנרגיה ל־Windows',
    'meta.desc': 'תוכנה חינמית ל־Windows שמצמצמת את צריכת החשמל של המחשב עד 40%: מצבי הספק, בהירות לכל המסכים, כיבוי מתוזמן והגנה מעמעום בזמן עבודה.'
  };

  /* Dynamic (script-rendered) strings */
  var DYN = {
    en: {
      hours1: '1 hour / day', hoursN: '{n} hours / day', month: '~{c}{v} / month', kwh: '{n} kWh', trees: '~{n} trees',
      detail: 'Saving ~{e}W in Eco • ~{s}W overnight', display1: '1 display (+{w}W Eco)', displayN: '{n} displays (+{w}W Eco)',
      rigEco: 'Eco', copied: '✓ Copied!', copyHash: 'Copy hash', copyCmd: 'Copy command', cmdCopied: '✓ Command copied!', copyLink: 'Copy link', linkCopied: '✓ Link copied!',
      baseline: 'Baseline (0% saved)', vs: '−{p}% vs Max Boost',
      eco: 'ECO SAVER ACTIVE', ecoAuto: 'ECO · AUTO IDLE', bal: 'BALANCED MODE', perf: 'MAX PERFORMANCE',
      d_eco: '🌿 ECO SAVER: screen 10% • CPU capped at 30% • PCIe power savings.',
      d_bal: '⚖️ BALANCED: screen 80% • the CPU adjusts to the load. Good for everyday use.',
      d_perf: '⚡ MAX PERFORMANCE: screen 100% • full CPU boost for heavy work.',
      idle: 'Idle {a} / 15:00', idleReady: 'Moves to Eco after inactivity, restores on activity.', idleCount: 'Counting inactivity…',
      idleEco: 'Auto-idle active — move the mouse to restore your previous mode.', simIdle: 'Simulate idle', simWake: 'Move mouse (wake)',
      shieldOn: 'monitoring audio / video / gamepad / AI', rigs: { regular: 'Office • 35W base', mid: 'Workstation • 75W base', great: 'Gaming • 120W base', ultra: 'Ultra rig • 180W base' }
    },
    he: {
      hours1: 'שעה אחת ביום', hoursN: '{n} שעות ביום', month: '~{c}{v} לחודש', kwh: '{n} קוט״ש', trees: '~{n} עצים',
      detail: 'חיסכון של ~{e}W ב־Eco • ~{s}W בלילה', display1: 'מסך 1 (+{w}W ב־Eco)', displayN: '{n} מסכים (+{w}W ב־Eco)',
      rigEco: 'Eco', copied: '✓ הועתק!', copyHash: 'העתקת hash', copyCmd: 'העתקת הפקודה', cmdCopied: '✓ הפקודה הועתקה!', copyLink: 'העתקת קישור', linkCopied: '✓ הקישור הועתק!',
      baseline: 'קו בסיס (0% חיסכון)', vs: '−{p}% לעומת Max Boost',
      eco: 'ECO SAVER פעיל', ecoAuto: 'ECO · סרק אוטומטי', bal: 'מצב BALANCED', perf: 'MAX PERFORMANCE',
      d_eco: '🌿 ECO: מסך 10% • מעבד מוגבל ל־30% • חיסכון ב־PCIe.',
      d_bal: '⚖️ BALANCED: מסך 80% • המעבד מתאים את עצמו לעומס. מתאים ליום־יום.',
      d_perf: '⚡ MAX PERFORMANCE: מסך 100% • ביצועים מלאים לעבודה כבדה.',
      idle: 'סרק {a} / 15:00', idleReady: 'עוברת ל־Eco אחרי זמן בלי פעילות וחוזרת כשחוזרים.', idleCount: 'סופר חוסר פעילות…',
      idleEco: 'מצב סרק פעיל. הזיזו את העכבר כדי לחזור.', simIdle: 'הדמיית סרק', simWake: 'הזזת עכבר (התעוררות)',
      shieldOn: 'ניטור שמע, וידאו, שלט ו־AI', rigs: { regular: 'משרדי • בסיס 35W', mid: 'תחנת עבודה • בסיס 75W', great: 'גיימינג • בסיס 120W', ultra: 'קצה עליון • בסיס 180W' }
    }
  };
  function L() { return root.getAttribute('lang') === 'he' ? 'he' : 'en'; }
  function D(key, vars) {
    var s = DYN[L()][key]; if (s === undefined) s = DYN.en[key];
    if (typeof s === 'string' && vars) for (var k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  var metaDesc = $('meta[name="description"]');
  var enTitle = document.title, enDesc = metaDesc ? metaDesc.getAttribute('content') : '';
  function applyLang(l, persist) {
    root.setAttribute('lang', l);
    root.setAttribute('dir', l === 'he' ? 'rtl' : 'ltr');
    if (persist) store.set('eco_lang', l);
    $$('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var k = el.getAttribute('data-i18n');
      el.innerHTML = (l === 'he' && HE[k] !== undefined) ? HE[k] : el.dataset.en;
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      if (el.dataset.enAria === undefined) el.dataset.enAria = el.getAttribute('aria-label') || '';
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', (l === 'he' && HE[k] !== undefined) ? HE[k] : el.dataset.enAria);
    });
    $$('[data-i18n-title]').forEach(function (el) {
      if (el.dataset.enTitle === undefined) el.dataset.enTitle = el.getAttribute('title') || '';
      var k = el.getAttribute('data-i18n-title');
      el.setAttribute('title', (l === 'he' && HE[k] !== undefined) ? HE[k] : el.dataset.enTitle);
    });
    document.title = l === 'he' ? HE['meta.title'] : enTitle;
    if (metaDesc) metaDesc.setAttribute('content', l === 'he' ? HE['meta.desc'] : enDesc);
    var lbl = $('#langLbl'); if (lbl) lbl.textContent = l === 'he' ? 'EN' : 'HE';
    var lb = $('#btnLang'); if (lb) lb.setAttribute('aria-label', l === 'he' ? 'Switch to English' : 'מעבר לעברית');
    renderSim(); calculateSavings(true); resetCopyLabels();
    document.dispatchEvent(new Event('eco:lang'));
  }

  /* ---- Easy / Advanced view (saved in this browser) ---- */
  function setView(v, persist) {
    root.setAttribute('data-view', v);
    if (persist) store.set('eco_view', v);
    var b = $('#btnView'), lb = $('#viewLbl');
    if (lb) lb.textContent = v === 'adv'
      ? (L() === 'he' ? 'תצוגה פשוטה' : 'Easy view')
      : (L() === 'he' ? 'תצוגה מתקדמת' : 'Advanced view');
    if (b) b.setAttribute('aria-pressed', v === 'adv' ? 'true' : 'false');
  }
  var btnView = $('#btnView');
  if (btnView) btnView.addEventListener('click', function () {
    setView(root.getAttribute('data-view') === 'adv' ? 'easy' : 'adv', true);
  });
  document.addEventListener('eco:lang', function () { setView(root.getAttribute('data-view') || 'easy', false); });
  function openHashTarget() {
    var id = (location.hash || '').slice(1), t = id && document.getElementById(id);
    if (t && t.closest('[data-level="adv"]') && root.getAttribute('data-view') !== 'adv') {
      setView('adv', true); t.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', openHashTarget);
  setView(root.getAttribute('data-view') || 'easy', false);
  openHashTarget();

  var btnLang = $('#btnLang');
  if (btnLang) btnLang.addEventListener('click', function () { applyLang(L() === 'he' ? 'en' : 'he', true); });

  /* =====================================================================
     Local page stats (stays in this browser; nothing is transmitted)
     ===================================================================== */
  var GH_RELEASES = 'https://api.github.com/repos/bambadooma-star/ecopower-suite-app/releases?per_page=30';
  var Stats = {
    key: 'ecopower_telemetry_store',
    get: function () {
      var d = null;
      try { d = JSON.parse(store.get(this.key) || 'null'); } catch (e) { d = null; }
      return d || this.fresh();
    },
    save: function (d) { store.set(this.key, JSON.stringify(d)); },
    fresh: function () {
      return { firstVisit: new Date().toISOString(), lastVisit: new Date().toISOString(), totalVisits: 0, uniqueSessions: 0,
        downloads: { githubOfficial: 0, localClicks: 0, events: [] }, interactions: { simulator: 0, calculator: 0, share: 0, hash_copy: 0 },
        referrers: {}, devices: { os: {}, formFactor: {} } };
    },
    init: function () {
      var d = this.get();
      d.totalVisits = (d.totalVisits || 0) + 1; d.lastVisit = new Date().toISOString();
      var sess = null; try { sess = sessionStorage.getItem('eco_session_active'); } catch (e) { /* ignore */ }
      if (!sess) { try { sessionStorage.setItem('eco_session_active', '1'); } catch (e) { /* ignore */ } d.uniqueSessions = (d.uniqueSessions || 0) + 1; }
      var ref = 'Direct';
      try { if (document.referrer) ref = new URL(document.referrer).hostname || 'Direct'; } catch (e) { ref = 'Direct'; }
      d.referrers = d.referrers || {}; d.referrers[ref] = (d.referrers[ref] || 0) + 1;
      var ua = navigator.userAgent || '', os = 'Other';
      if (/Android|iPhone|iPad/i.test(ua)) os = 'Mobile device';
      else if (ua.indexOf('Windows NT 10.0') > -1) os = 'Windows 10/11';
      else if (ua.indexOf('Windows') > -1) os = 'Windows (older)';
      else if (ua.indexOf('Macintosh') > -1) os = 'macOS';
      else if (ua.indexOf('Linux') > -1) os = 'Linux';
      d.devices = d.devices || { os: {}, formFactor: {} };
      d.devices.os[os] = (d.devices.os[os] || 0) + 1;
      var ff = /Mobi|Android/i.test(ua) ? 'Mobile / tablet' : 'Desktop / PC';
      d.devices.formFactor[ff] = (d.devices.formFactor[ff] || 0) + 1;
      this.save(d);
      this.syncGitHub(false);
    },
    trackDownload: function (source) {
      var d = this.get();
      d.downloads.localClicks = (d.downloads.localClicks || 0) + 1;
      d.downloads.events.push({ timestamp: new Date().toISOString(), source: source, referrer: document.referrer || 'Direct' });
      if (d.downloads.events.length > 200) d.downloads.events = d.downloads.events.slice(-200);
      this.save(d);
    },
    _last: 0,
    track: function (type) {
      var now = Date.now();
      if (type === 'calculator' || type === 'simulator') { if (now - this._last < 1500) return; this._last = now; }
      var d = this.get(); d.interactions = d.interactions || {};
      d.interactions[type] = (d.interactions[type] || 0) + 1; this.save(d);
    },
    syncGitHub: function (force) {
      var self = this, cached = null;
      try { cached = JSON.parse(sessionStorage.getItem('eco_gh_count') || 'null'); } catch (e) { cached = null; }
      if (!force && cached && Date.now() - cached.t < 600000) { self.setCount(cached.n); return; }
      if (!window.fetch) return;
      fetch(GH_RELEASES, { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (rels) {
          var n = 0;
          (rels || []).forEach(function (rel) { (rel.assets || []).forEach(function (a) { if (/\.exe$/i.test(a.name)) n += a.download_count || 0; }); });
          try { sessionStorage.setItem('eco_gh_count', JSON.stringify({ t: Date.now(), n: n })); } catch (e) { /* ignore */ }
          var d = self.get(); d.downloads.githubOfficial = n; self.save(d); self.setCount(n);
        })
        .catch(function () { /* offline or rate-limited: counter simply stays hidden */ });
    },
    setCount: function (n) {
      var w = $('#dlCountWrap'), c = $('#dlCount');
      if (w && c && n > 0) { c.textContent = n.toLocaleString(); w.classList.remove('hidden'); }
      var g = $('#statGhDownloads'); if (g) g.textContent = n;
    },
    kvRow: function (parent, k, v) {
      var row = document.createElement('div'), a = document.createElement('span'), b = document.createElement('b');
      a.textContent = k; b.textContent = v; row.appendChild(a); row.appendChild(b); parent.appendChild(row);
    },
    render: function () {
      var d = this.get(), visits = d.totalVisits || 1, clicks = d.downloads.localClicks || 0;
      $('#statGhDownloads').textContent = d.downloads.githubOfficial || 0;
      $('#statLocalClicks').textContent = clicks;
      $('#statVisits').textContent = visits;
      $('#statConversion').textContent = ((clicks / visits) * 100).toFixed(1) + '%';
      var i = d.interactions || {};
      $('#statSimInteractions').textContent = i.simulator || 0;
      $('#statCalcInteractions').textContent = i.calculator || 0;
      $('#statShareClicks').textContent = i.share || 0;
      $('#statHashCopies').textContent = i.hash_copy || 0;
      var rc = $('#trafficReferrersList'); rc.textContent = '';
      var self = this;
      Object.keys(d.referrers || {}).sort(function (a, b) { return d.referrers[b] - d.referrers[a]; }).forEach(function (k) { self.kvRow(rc, k, d.referrers[k]); });
      var dc = $('#deviceTechList'); dc.textContent = '';
      Object.keys((d.devices || {}).os || {}).forEach(function (k) { self.kvRow(dc, 'OS: ' + k, d.devices.os[k]); });
      Object.keys((d.devices || {}).formFactor || {}).forEach(function (k) { self.kvRow(dc, k, d.devices.formFactor[k]); });
    },
    exportReport: function () {
      var blob = new Blob([JSON.stringify(this.get(), null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = 'ecopower_page_stats_' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    },
    reset: function () {
      store.del(this.key); try { sessionStorage.removeItem('eco_gh_count'); } catch (e) { /* ignore */ }
      this.render();
    }
  };
  $$('[data-dl]').forEach(function (a) { a.addEventListener('click', function () { Stats.trackDownload(a.getAttribute('data-dl')); }); });

  var dlg = $('#statsDialog');
  function openStats() { if (!dlg) return; Stats.render(); if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', ''); }
  if (dlg) {
    $('#btnStats').addEventListener('click', openStats);
    $('#statsClose').addEventListener('click', function () { dlg.close ? dlg.close() : dlg.removeAttribute('open'); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    $('#btnStatsExport').addEventListener('click', function () { Stats.exportReport(); });
    $('#btnStatsSync').addEventListener('click', function () { Stats.syncGitHub(true); setTimeout(function () { Stats.render(); }, 1200); });
    $('#btnStatsReset').addEventListener('click', function () { Stats.reset(); });
  }
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.shiftKey && e.code === 'KeyD') || (e.altKey && e.code === 'KeyI')) { e.preventDefault(); openStats(); }
  });

  /* =====================================================================
     Interactive simulator
     ===================================================================== */
  var CIRC = 395.8; /* 270° arc length on r=84 */
  var SIM = { eco: { cpu: 4.5, gpu: 5, base: 5, bright: 10 }, balanced: { cpu: 12.4, gpu: 5, base: 5, bright: 80 }, perf: { cpu: 42, gpu: 8, base: 5, bright: 100 } };
  var BASELINE_W = 95; /* Max Performance @ 100% brightness */
  var sim = { mode: 'balanced', bright: 80, auto: false, prev: 'balanced', idleTimer: null, idleSec: 0, idleState: 'ready' };
  var el = function (id) { return document.getElementById(id); };
  function screenWatts(b) { return 6 + b * 0.34; } /* 10% ≈ 9.4 W, 100% = 40 W */
  function fmtW(n) { return n.toFixed(1) + ' W'; }
  function setGauge(node, w) { if (node) node.style.strokeDasharray = (Math.max(0.02, Math.min(1, w / 100)) * CIRC).toFixed(1) + ' 600'; }
  function setBadge(node, cls, text) { node.className = 'w-badge ' + cls; node.textContent = text; }
  function mmss(s) { return ('0' + Math.floor(s / 60)).slice(-2) + ':' + ('0' + Math.floor(s % 60)).slice(-2); }

  function renderSim() {
    if (!el('simTotalWatts')) return;
    var p = SIM[sim.mode], b = sim.bright;
    var scr = screenWatts(b), total = scr + p.cpu + p.gpu + p.base;
    el('simTotalWatts').textContent = total.toFixed(1);
    setGauge(el('demoGaugeVal'), total);
    el('valScreen').textContent = fmtW(scr); el('valCpu').textContent = fmtW(p.cpu); el('valGpu').textContent = fmtW(p.gpu); el('valBase').textContent = fmtW(p.base);
    el('barScreen').style.width = Math.min(100, scr / 45 * 100) + '%';
    el('barCpu').style.width = Math.min(100, p.cpu / 45 * 100) + '%';
    el('barGpu').style.width = Math.min(100, p.gpu / 45 * 100) + '%';
    el('barBase').style.width = Math.min(100, p.base / 45 * 100) + '%';
    var pct = Math.round((BASELINE_W - total) / BASELINE_W * 100), chip = el('simSavingsPct');
    if (pct <= 0) { chip.className = 'save-chip base'; chip.textContent = D('baseline'); }
    else { chip.className = 'save-chip' + (sim.mode === 'balanced' ? ' cyan' : ''); chip.textContent = D('vs', { p: pct }); }
    var map = { eco: ['btnSimEco', 'eco'], balanced: ['btnSimBalanced', 'bal'], perf: ['btnSimPerf', 'perf'] };
    Object.keys(map).forEach(function (m) {
      var btn = el(map[m][0]), on = m === sim.mode;
      btn.className = 'mode ' + map[m][1] + (on ? ' on' : '');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var badge = el('demoModeBadge');
    if (sim.mode === 'eco') setBadge(badge, 'em', sim.auto ? D('ecoAuto') : D('eco'));
    else if (sim.mode === 'balanced') setBadge(badge, 'cy', D('bal'));
    else setBadge(badge, 'sky', D('perf'));
    el('simModeDesc').textContent = D(sim.mode === 'eco' ? 'd_eco' : (sim.mode === 'balanced' ? 'd_bal' : 'd_perf'));
    el('simBright').value = b; el('simBrightVal').textContent = Math.round(b) + '%';
    el('simSmartStatus').textContent = D('shieldOn');
    el('btnSimIdle').textContent = sim.idleState === 'eco' ? D('simWake') : D('simIdle');
    el('simIdleHint').textContent = sim.idleState === 'eco' ? D('idleEco') : (sim.idleState === 'counting' ? D('idleCount') : D('idleReady'));
    el('simIdleTxt').textContent = D('idle', { a: mmss(sim.idleSec) });
  }
  function stopIdle() { if (sim.idleTimer) { clearInterval(sim.idleTimer); sim.idleTimer = null; } }
  function resetIdleUi() { sim.idleSec = 0; sim.idleState = 'ready'; el('simIdleBar').style.width = '0%'; el('simIdleWrap').setAttribute('aria-valuenow', '0'); }
  function setSimMode(mode, auto) {
    if (!SIM[mode]) return;
    if (!auto) { stopIdle(); resetIdleUi(); }
    sim.mode = mode; sim.auto = !!auto; sim.bright = SIM[mode].bright;
    renderSim();
    if (!auto) Stats.track('simulator');
  }
  function simIdle() {
    if (sim.idleState === 'eco') { /* wake */
      sim.auto = false; setSimMode(sim.prev, false); return;
    }
    if (sim.idleState === 'counting') return;
    if (sim.mode === 'eco') setSimMode('balanced', false);
    sim.prev = sim.mode; sim.idleState = 'counting'; sim.idleSec = 0;
    Stats.track('simulator');
    var steps = 0, total = 60;
    stopIdle();
    sim.idleTimer = setInterval(function () {
      steps++;
      sim.idleSec = steps / total * 900;
      el('simIdleBar').style.width = (steps / total * 100) + '%';
      el('simIdleWrap').setAttribute('aria-valuenow', Math.round(steps / total * 100));
      if (steps >= total) { stopIdle(); sim.idleState = 'eco'; setSimMode('eco', true); }
      else el('simIdleTxt').textContent = D('idle', { a: mmss(sim.idleSec) });
    }, 40);
    renderSim();
  }
  if (el('btnSimEco')) {
    el('btnSimEco').addEventListener('click', function () { setSimMode('eco'); });
    el('btnSimBalanced').addEventListener('click', function () { setSimMode('balanced'); });
    el('btnSimPerf').addEventListener('click', function () { setSimMode('perf'); });
    el('simBright').addEventListener('input', function (e) { sim.bright = parseInt(e.target.value, 10); renderSim(); Stats.track('simulator'); });
    el('btnSimIdle').addEventListener('click', simIdle);
  }

  /* Hero dashboard: gentle live wobble (decorative) */
  var heroW = 62.4, heroTimer = null;
  function heroTick() {
    heroW = Math.max(58, Math.min(67, heroW + (Math.random() - 0.5) * 2.2));
    var hw = $('#heroWatts'); if (hw) hw.textContent = heroW.toFixed(1);
    setGauge($('#heroGaugeVal'), heroW);
  }
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) heroTimer = setInterval(function () { if (!document.hidden && !root.classList.contains('no-motion')) heroTick(); }, 1800);
  setGauge($('#heroGaugeVal'), heroW);
  setGauge($('#demoGaugeVal'), 62.4);

  /* =====================================================================
     Savings calculator
     ===================================================================== */
  var RIGS = { regular: { eco: 35, down: 45 }, mid: { eco: 75, down: 90 }, great: { eco: 120, down: 140 }, ultra: { eco: 180, down: 215 } };
  var calc = { rig: 'great', mon: 1, cur: '₪' };
  var hoursRange = el('hoursRange'), tariffRange = el('tariffRange'), shutdownToggle = el('shutdownToggle');

  function calculateSavings(silent) {
    if (!hoursRange) return;
    var hours = parseFloat(hoursRange.value), tariff = parseFloat(tariffRange.value), shut = shutdownToggle.checked;
    el('hoursVal').textContent = hours === 1 ? D('hours1') : D('hoursN', { n: hours });
    el('tariffVal').textContent = calc.cur + tariff.toFixed(2) + ' / kWh';
    var rig = RIGS[calc.rig];
    var ecoW = rig.eco + calc.mon * 18, downW = rig.down + calc.mon * 28;
    var annualKwh = ((ecoW * hours) / 1000 + (shut ? (downW * 8) / 1000 : 0)) * 365;
    var cost = annualKwh * tariff, month = cost / 12, co2 = annualKwh * 0.5, trees = Math.round(co2 / 22);
    el('annualCostDisplay').textContent = calc.cur + cost.toFixed(2);
    el('monthlyCostBadge').textContent = D('month', { c: calc.cur, v: month.toFixed(2) });
    el('annualKwhDisplay').textContent = D('kwh', { n: annualKwh.toFixed(1) });
    el('powerSavedDetail').textContent = D('detail', { e: Math.round(ecoW), s: shut ? Math.round(downW) : 0 });
    el('co2Display').textContent = '~' + Math.round(co2) + ' kg';
    el('treesDisplay').textContent = D('trees', { n: trees });
    el('rigBadge').textContent = D('rigs')[calc.rig];
    el('monitorsBadge').textContent = calc.mon === 1 ? D('display1', { w: 18 }) : D('displayN', { n: calc.mon, w: calc.mon * 18 });
    el('currSymbolLabel').textContent = calc.cur;
    if (!silent) Stats.track('calculator');
  }
  function selectRig(t) {
    if (!RIGS[t]) return; calc.rig = t;
    Object.keys(RIGS).forEach(function (k) { el('rigBtn-' + k).setAttribute('aria-pressed', k === t ? 'true' : 'false'); });
    calculateSavings();
  }
  function selectMonitors(n) {
    calc.mon = parseInt(n, 10) || 1;
    [1, 2, 3, 4].forEach(function (c) { el('monBtn-' + c).setAttribute('aria-pressed', c === calc.mon ? 'true' : 'false'); });
    calculateSavings();
  }
  function setCurrency(sym, rate) {
    calc.cur = sym; tariffRange.value = rate;
    el('btnCurrIls').setAttribute('aria-pressed', sym === '₪' ? 'true' : 'false');
    el('btnCurrUsd').setAttribute('aria-pressed', sym === '$' ? 'true' : 'false');
    calculateSavings();
  }
  if (hoursRange) {
    $$('[data-rig]').forEach(function (b) { b.addEventListener('click', function () { selectRig(b.getAttribute('data-rig')); }); });
    $$('[data-mon]').forEach(function (b) { b.addEventListener('click', function () { selectMonitors(b.getAttribute('data-mon')); }); });
    el('btnCurrIls').addEventListener('click', function () { setCurrency('₪', 0.61); });
    el('btnCurrUsd').addEventListener('click', function () { setCurrency('$', 0.18); });
    hoursRange.addEventListener('input', function () { calculateSavings(); });
    tariffRange.addEventListener('input', function () { calculateSavings(); });
    shutdownToggle.addEventListener('change', function () { calculateSavings(); });
  }

  /* =====================================================================
     Copy / share
     ===================================================================== */
  var copyTimers = {};
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); var ok = document.execCommand('copy'); document.body.removeChild(ta); ok ? res() : rej();
      } catch (e) { rej(e); }
    });
  }
  function flash(id, doneKey, idleKey) {
    var n = el(id); if (!n) return;
    n.textContent = D(doneKey);
    clearTimeout(copyTimers[id]);
    copyTimers[id] = setTimeout(function () { n.textContent = D(idleKey); }, 2000);
  }
  function resetCopyLabels() {
    if (el('lblCopyHash')) el('lblCopyHash').textContent = D('copyHash');
    if (el('lblCopyPs')) el('lblCopyPs').textContent = D('copyCmd');
    if (el('lblShareCopyText')) el('lblShareCopyText').textContent = D('copyLink');
  }
  if (el('btnCopyHash')) el('btnCopyHash').addEventListener('click', function () {
    copyText(el('hashValue').textContent.trim()).then(function () { Stats.track('hash_copy'); flash('lblCopyHash', 'copied', 'copyHash'); });
  });
  if (el('btnCopyPs')) el('btnCopyPs').addEventListener('click', function () {
    copyText('Get-FileHash .\\EcoPowerSuite.exe -Algorithm SHA256').then(function () { Stats.track('hash_copy'); flash('lblCopyPs', 'cmdCopied', 'copyCmd'); });
  });

  var SHARE_URL = 'https://bambadooma-star.github.io/ecopower-suite-app/';
  var SHARE_TITLE = 'EcoPower Suite - Intelligent Windows Energy & Battery Optimization';
  var SHARE_TEXT = '🌱 Cut PC electricity use and boost laptop battery life with EcoPower Suite — smart DDC/CI monitor dimming, balanced battery switching and zero false idles. Free for Windows:';
  function shareSocial(p) {
    var u = encodeURIComponent(SHARE_URL), url = '';
    if (p === 'whatsapp') url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(SHARE_TEXT + ' ' + SHARE_URL);
    else if (p === 'twitter') url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(SHARE_TEXT) + '&url=' + u + '&hashtags=EcoPower,Windows11,EnergySaving';
    else if (p === 'linkedin') url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + u;
    else if (p === 'reddit') url = 'https://reddit.com/submit?url=' + u + '&title=' + encodeURIComponent(SHARE_TITLE);
    else if (p === 'facebook') url = 'https://www.facebook.com/sharer/sharer.php?u=' + u;
    Stats.track('share');
    if (url) window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  }
  $$('[data-share]').forEach(function (b) { b.addEventListener('click', function () { shareSocial(b.getAttribute('data-share')); }); });
  function copyShareLink() {
    copyText(SHARE_URL).then(function () { Stats.track('share'); flash('lblShareCopyText', 'linkCopied', 'copyLink'); });
  }
  if (el('btnShareCopyLink')) el('btnShareCopyLink').addEventListener('click', copyShareLink);
  if (el('btnNativeShare')) el('btnNativeShare').addEventListener('click', function () {
    if (navigator.share) navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL }).then(function () { Stats.track('share'); }).catch(function () { /* cancelled */ });
    else copyShareLink();
  });

  /* ---------------- init ---------------- */
  Stats.init();
  var startLang = L();
  /* Keep EN originals captured even when the page boots in Hebrew */
  applyLang(startLang, false);
  calculateSavings(true);
  renderSim();
})();
