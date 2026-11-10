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
    'nav.demo': 'הדגמה חיה', 'nav.features': 'יכולות', 'nav.shield': 'מגן חכם', 'nav.calc': 'מחשבון חיסכון', 'nav.security': 'אבטחה', 'nav.faq': 'שאלות נפוצות',
    'support': 'תמיכה', 'support.title': 'תמכו במפתח ב־PayPal', 'support.long': 'תמכו במפתח העצמאי ב־PayPal',
    'download': 'הורדה', 'menu': 'תפריט', 'dl.long': 'הורדה חינם v1.1.0 (Windows 64 סיביות)',
    'hero.pill': 'חינמי · פרטי · בלי פרסומות — מנהל צריכת חשמל ל־Windows',
    'hero.h1': 'צמצמו את צריכת החשמל של המחשב <span class="grad-text">עד 40%</span>',
    'hero.lead': 'ניהול אנרגיה חכם למחשבים נייחים, ניידים והתקנים מרובי מסכים. חשבון חשמל נמוך יותר, פחות חום ופחות פליטות — בלי התקנה, בלי פרסומות ובלי טלמטריה.',
    'hero.cta': 'הורדה ל־Windows', 'hero.demo': 'נסו את ההדגמה החיה',
    'hero.m1': 'Windows 10 ו־11 (64 סיביות)', 'hero.m2': 'קובץ יחיד — ללא התקנה', 'hero.m3': 'ללא פרסומות וללא טלמטריה', 'hero.downloads': 'הורדות ב־GitHub',
    'hero.fine': 'נתוני החיסכון הם הערכות מדומות; התוצאות בפועל תלויות בחומרה, בשימוש ובתעריף שלכם.',
    'trust.1': 'מחשבים נייחים וניידים', 'trust.2': 'תמיכה בריבוי מסכים', 'trust.3': 'Intel ו־AMD (x64)', 'trust.4': 'עובד גם ללא אינטרנט',
    'demo.eyebrow': 'סימולטור אינטראקטיבי חי', 'demo.title': 'ראו איך EcoPower Suite מגיבה',
    'demo.lead': 'החליפו מצבים, הזיזו את מחוון הבהירות או דמו זמן סרק — וצפו בשינוי ההספק והחיסכון בדיוק כמו באפליקציה. הערכים להמחשה בלבד.',
    'demo.jump': 'חשבו את החיסכון המדויק שלכם לפי סוג מחשב ומסכים',
    'feat.eyebrow': 'הכול באפליקציה אחת בסרגל המשימות', 'feat.title': 'צריכה חכמה יותר, בלי לשמור עליה',
    'feat.lead': 'EcoPower Suite מפעילה שינויים כאירועים חד־פעמיים נקיים — בלי להילחם בכם בלולאות רקע — ויושבת בשקט באזור ההודעות.',
    'f1.t': 'שלושה מצבי הספק חכמים', 'f1.p': '<strong>Eco Saver</strong> מגביל את המעבד, מעמעם מסכים ומפעיל חיסכון מרבי ב־PCIe ASPM. <strong>Balanced</strong> הוא ברירת המחדל היומיומית. <strong>Max Performance</strong> פותח טורבו מלא וזמן השהיה אפסי בפס.',
    'f2.t': 'חוסך סרק אוטומטי', 'f2.p': 'אחרי 2–60 דקות ללא פעילות המחשב עובר ל־Eco, וברגע שנוגעים בעכבר או במקלדת חוזר למצב הקודם. מעדיפים שליטה? אפשר לנעול Eco ידנית.',
    'f3.t': 'כל המסכים, מחוון אחד', 'f3.p': 'שולטת במסכים חיצוניים דרך DDC/CI ובמסכי מחשב נייד דרך WMI בו־זמנית, עם התאמת טווח נכונה לכל מסך ועדכון שאינו חוסם את הממשק.',
    'f4.t': 'מגן חוסר־פעילות חכם', 'f4.p': 'לעולם לא מעמעם בזמן שיחת וידאו, סרט, משחק או משימת AI מקומית. זיהוי שמע, מסך מלא, שלט משחק ועומסי AI משהה את מונה הסרק אוטומטית.',
    'f5.t': 'כיבוי מתוזמן', 'f5.p': 'כיבוי יומי דרך מתזמן המשימות של Windows עם התראה של 30 שניות, דחייה אמיתית לשעה או ביטול להיום. מפסיקים לשלם על מחשב שרץ כל הלילה.',
    'f6.t': 'מעקב חיסכון', 'f6.p': 'עקבו אחר קוט״ש וכסף שנחסכו היום, מתחילת השנה והתחזית ל־12 החודשים הבאים — במטבע שלכם ובתעריף החשמל שלכם.',
    'hw.eyebrow': 'כיסוי חומרה אוניברסלי', 'hw.title': 'נבנתה לרוץ על כל מחשב שברשותכם',
    'hw.lead': 'עמדת גיימינג חזקה, תחנת עבודה עם שני מסכים או נייד על סוללה — אותו קובץ הפעלה יחיד.',
    'hw1.t': 'מחשבים נייחים', 'hw1.p': 'שליטה ב־VESA DDC/CI דרך HDMI ו־DisplayPort, וצריכת סרק נמוכה יותר ללוחות אם ולכרטיסי מסך נפרדים.',
    'hw2.t': 'מחשבים ניידים', 'hw2.p': 'מסכים מובנים דרך WMI. ניתוק מהחשמל מעביר פעם אחת למצב <strong>Balanced</strong> ומאריך את חיי הסוללה בלי להחשיך אתכם ל־10%.',
    'hw3.t': 'התקנים מרובי מסכים', 'hw3.p': 'מזהה כל מסך מחובר ומכוונת את כל התאורות האחוריות יחד, כך שהחיסכון מוכפל בכל המסכים.',
    'hw4.t': 'מעבדי Intel ו־AMD', 'hw4.p': 'גרסת x86 מקורית של 64 סיביות ל־Windows 10 ו־11 על Intel Core ו־AMD Ryzen. מחשבי Windows על ARM מריצים אותה דרך אמולציית x64 של Windows; יכולות חומרה עשויות להשתנות שם.',
    'how.eyebrow': 'איך זה עובד', 'how.title': 'שלושה צעדים. בלי התקנה.',
    's1.t': 'מורידים ומריצים', 's1.p': 'מורידים את הקובץ היחיד <code>EcoPowerSuite.exe</code>, לוחצים פעמיים, והוא מתיישב באזור ההודעות במצב Balanced.',
    's2.t': 'בוחרים מצב — או נותנים ל־Auto לטפל', 's2.p': 'מחליפים מצב בלחיצה אחת מהלוח או מסרגל המשימות. הסרק האוטומטי עובר ל־Eco כשמתרחקים וחוזר כשחוזרים.',
    's3.t': 'צופים בחיסכון מצטבר', 's3.p': 'לשונית החיסכון מציגה קוט״ש וכסף שנחסכו היום, השנה והתחזית — לפי התעריף שלכם.',
    'sh.eyebrow': 'מניעת זיהוי שגוי', 'sh.title': 'מגן חוסר־הפעילות החכם',
    'sh.lead': 'טיימרים רגילים של Windows מעמעמים את המסך באמצע סרט או שיחה. EcoPower Suite קוראת אותות מקוריים של שמע, מסך מלא ושלטי משחק כדי שלא תופרעו לעולם.',
    'sh1.t': 'זיהוי וידאו ומדיה במסך מלא', 'sh1.p': 'YouTube, Netflix, Disney+‎, VLC ומצגות במסך מלא בכל מסך.',
    'sh2.t': 'ניטור זרם שמע פעיל', 'sh2.p': 'מאזין מקורי של <code>IAudioSessionManager2</code> שומר על המחשב ער בזמן Spotify, ‏Zoom, ‏Discord או Teams.',
    'sh3.t': 'פעילות שלט משחק (XInput)', 'sh3.p': 'משחקים עם שלט Xbox או PlayStation בלי עכבר? קלט השלט שומר על המחשב פעיל.',
    'sh4.t': 'מגן עומסי AI ו־LLM מקומיים', 'sh4.p': 'עוקב אחר הסקה מקומית (<strong>Ollama, ‏LM Studio, ‏ComfyUI, ‏llama.cpp, ‏Whisper</strong>) וחישוב CUDA של NVIDIA מעל 15% עומס, כך שהרדמה והגבלת מעבד לא יפריעו ליצירת טוקנים או לרינדור דיפוזיה.',
    'sh5.t': 'אוטומציית CLI לבוטים וסוכני AI', 'sh5.p': 'ממשק שורת פקודה ללא חלון עם פלט JSON (<code>--status --json</code>, ‏<code>--mode &lt;eco|balanced|perf&gt;</code>, ‏<code>--brightness &lt;0-100&gt;</code>) מאפשר לסקריפטים ולסוכנים לשלוט בתכניות ההספק.',
    'calc.eyebrow': 'סימולטור החזר כלכלי', 'calc.title': 'מחשבון חיסכון חי',
    'calc.lead': 'מותאם לסוג המחשב ולמספר המסכים שלכם. תחנות עבודה ומחשבי גיימינג חזקים חוסכים הכי הרבה. הנתונים הם הערכות.',
    'calc.rig': '1. סוג המחשב', 'rig.regular': 'משרדי רגיל', 'rig.mid': 'תחנת עבודה בינונית', 'rig.great': 'גיימינג מתקדם', 'rig.ultra': 'קצה עליון',
    'calc.mon': '2. מסכים מחוברים', 'mon.1': 'מסך 1', 'mon.2': '2 כפול', 'mon.3': '3 משולש', 'mon.4': '4+ מרובע',
    'calc.monnote': 'עמעום תאורה ב־DDC/CI ושינת מסך בסרק חוסכים בערך 18–28 ואט לכל מסך פעיל.',
    'calc.cur': 'מטבע', 'calc.hours': 'שעות סרק / רקע ביום', 'calc.rate': 'תעריף חשמל',
    'calc.shut': 'כולל כיבוי אוטומטי לילי (8 שעות בלילה)',
    'calc.proj': 'חיסכון שנתי צפוי', 'calc.kwh': 'אנרגיה שנחסכה בשנה', 'calc.co2': 'הפחתת CO₂', 'calc.trees': 'שווה ערך לעצים שניטעו',
    'new.title': 'מה חדש ב־v1.1.0', 'new.lead': 'לוח בקרה מעוצב מחדש, ממשק חלק משמעותית וסדרת תיקונים חשובים.',
    'n1.t': 'עיצוב חדש', 'n1.a': '<b>לוח בקרה מעוצב מחדש</b> עם ניווט בסרגל צד', 'n1.b': '<b>מד הספק חי</b> עם פירוט לפי רכיב',
    'n2.t': 'מהיר וחלק יותר', 'n2.a': '<b>סוף ללאגים בממשק</b> — פקודות רקע כבר לא חוסמות את החלון', 'n2.b': '<b>בהירות שאינה חוסמת</b> עם התאמת טווח DDC/CI נכונה לכל מסך',
    'n3.t': 'תיקונים', 'n3.a': 'הבהירות <b>כבר לא מתאפסת ל־100%</b> בהפעלה', 'n3.b': 'הגדרת <b>תעריף החשמל</b> אכן מתקבלת', 'n3.c': 'חיסכון <b>אמיתי מתחילת השנה</b>',
    'n3.d': '<b>דחיית הכיבוי</b> אכן מתזמנת מחדש', 'n3.e': 'CLI: ‏<code>--status</code> מזהה Eco נכון; <b>בהירות נייד דרך CLI</b> עובדת',
    'n4.t': 'עדכונים בטוחים יותר', 'n4.a': '<b>מעדכן בטוח יותר</b> עם בדיקות תקינות', 'n4.b': '<b>בדיקת עדכון אוטומטית לפי בחירה</b> — כבויה כברירת מחדל, שום דבר לא פונה לרשת אלא אם תבחרו',
    'spec.eyebrow': 'ארכיטקטורה ופרטיות', 'spec.title': 'מפרט טכני', 'spec.lead': 'קלה, ניידת ומבוססת על ממשקי Windows מאושרים.',
    'spec.os': 'מערכת הפעלה', 'spec.arch': 'ארכיטקטורה', 'spec.size': 'גודל קובץ', 'spec.ver': 'גרסה', 'spec.net': 'שימוש ברשת', 'spec.netv': 'רק בדיקת עדכון לפי דרישה (GitHub)',
    'spec.ipc': 'מופע יחיד (IPC)', 'spec.ddc': 'עמעום מסך נייח', 'spec.wmi': 'עמעום מסך נייד', 'spec.aspm': 'צריכת קו PCIe‏ (ASPM)', 'spec.aspmv': 'חיסכון מרבי ב־Eco', 'spec.auto': 'הפעלה עם Windows',
    'sec.eyebrow': 'אבטחה ושלמות', 'sec.title': 'פרטית וניתנת לאימות מעצם תכנונה',
    'sec.lead': 'כלי אנרגיה צריכים להרוויח אמון. ב־EcoPower Suite אין טלמטריה, חשבונות או פרסומות — והפעם היחידה שהיא פונה לרשת היא כשאתם מבקשים ממנה לבדוק עדכון.',
    'sc1.t': 'אמתו בעצמכם', 'sc1.p': 'אל תסמכו עלינו: חפשו את ה־SHA-256 שלמטה ב־VirusTotal, או העלו את הקובץ ותנו לעשרות מנועי אנטי־וירוס לסרוק אותו בזמן אמת. השוו את ה־hash למה שהורדתם.',
    'sc1.a': 'חיפוש ה־hash ב־VirusTotal', 'sc1.b': 'העלאה וסריקת קובץ',
    'sc2.t': 'אופליין מעצם התכנון', 'sc2.p': 'בלי טלמטריה, בלי מזהים אישיים, בלי העלאות. שליטת ההספק פועלת על ממשקי Windows מקומיים. החריג היחיד הוא אופציונלי: כשלוחצים <strong>בדיקת עדכונים</strong> (או מאשרים בדיקה אוטומטית), האפליקציה פונה ל־GitHub כדי לקרוא את הגרסה האחרונה ולהוריד אותה.',
    'sc2.s': 'פעילות רשת', 'sc2.v': 'רק GitHub, רק לעדכונים',
    'sc3.t': 'הפעלה לא הרסנית', 'sc3.p': 'בלי דרייברים בליבה ובלי שינויי מערכת קבועים — רק ממשקי Win32 מאושרים (<code>powercfg</code>, ‏<code>dxva2.dll</code>, ‏WMI). <strong>יציאה ושחזור</strong> מחזירה את תכנית ההספק ל־Balanced.',
    'sc3.s': 'הסרה', 'sc3.v': 'יציאה ושחזור, ואז מחיקת הקובץ',
    'sc4.t': 'מודל עסקי שקוף', 'sc4.p': 'EcoPower Suite חינמית. הפיתוח נתמך אך ורק בתרומות מרצון — בלי תוכנות פרסום מצורפות, בלי חטיפת חיפוש, בלי כורי מטבעות ובלי טלמטריה. אם היא חוסכת לכם כסף, שקלו לקנות למפתח קפה.',
    'sc4.a': 'תמיכה ב־PayPal',
    'zb.t': 'אפס אמון עיוור: שלוש דרכים לבדוק', 'zb.p': 'לפני שמריצים את <code>EcoPowerSuite.exe</code>, כל משתמש יכול לאמת אותו באופן עצמאי:',
    'zb.1k': 'שלב 1 · סריקה מרובת מנועים', 'zb.1t': 'סריקת VirusTotal', 'zb.1p': 'העלו את הקובץ (או חפשו את ה־hash שלו) ב־VirusTotal ובדקו בעצמכם את תוצאות המנועים.',
    'zb.2k': 'שלב 2 · סיבית אחר סיבית', 'zb.2t': 'SHA-256 קריפטוגרפי', 'zb.2p': 'חשבו hash להורדה שלכם והשוו אותו לסכום הבדיקה המפורסם בדף זה ובגרסה ב־GitHub.',
    'zb.3k': 'שלב 3 · מקור רשמי', 'zb.3t': 'גרסאות רשמיות בלבד', 'zb.3p': 'הורידו רק מדף הגרסאות הרשמי ב־GitHub או מהמראה של האתר.', 'zb.3a': 'פתיחת דף הגרסאות ↗',
    'vc.t': 'הרצת בדיקת SHA-256 מקומית', 'vc.p': 'פתחו PowerShell בתיקיית ההורדה והריצו:',
    'ss.t': 'למה Windows SmartScreen כותב "מפרסם לא ידוע"?',
    'ss.p1': 'SmartScreen בונה מוניטין לתוכנות חדשות לאורך זמן, ותעודת חתימת קוד EV עולה מאות דולרים בשנה. EcoPower Suite היא כלי עצמאי חינמי, ולכן Windows עשוי להציג אזהרה כחולה בהפעלה הראשונה.',
    'ss.p2': '<strong>איך מריצים:</strong> לוחצים <u>מידע נוסף</u> ← <u>הפעל בכל זאת</u>, לאחר שוידאתם שה־SHA-256 שלמעלה תואם להורדה שלכם.',
    'dl.title': 'מוכנים לייעל את צריכת החשמל?', 'dl.lead': 'בלי התקנה, בלי תוכנות פרסום, בלי טלמטריה. לוחצים פעמיים ורצים.',
    'dl.btn': 'הורדת EcoPowerSuite.exe (v1.1.0)', 'dl.mirror': 'מראה ישירה',
    'share.eyebrow': 'מפיצים את החיסכון', 'share.title': 'שתפו את EcoPower Suite',
    'share.lead': 'מכירים מישהו שהמחשב שלו מתחמם, מבזבז חשמל בלילה או מרוקן סוללה? שלחו לו את הכלי החינמי.', 'share.btn': 'שיתוף הדף',
    'faq.title': 'שאלות נפוצות',
    'q1.q': 'איך עובדת ההחלפה האוטומטית בנייד?', 'q1.a': 'כשמנתקים מהחשמל, EcoPower Suite מזהה את המעבר דרך ממשק ההספק של Windows ועוברת פעם אחת למצב <strong>Balanced</strong>. כך נמנע עמעום אגרסיבי ל־10% תוך מניעת צריכת טורבו גבוהה על הסוללה.',
    'q2.q': 'האם צפייה בסרטים או משחק יופרעו?', 'q2.a': 'לא. מגן חוסר־הפעילות החכם עוקב אחר זרמי שמע, חלונות במסך מלא, שלטי משחק (XInput) ועומסי AI מקומיים. כל עוד אחד מהם פעיל, עמעום הסרק האוטומטי מושהה.',
    'q3.q': 'האם יש תמיכה בריבוי מסכים?', 'q3.a': 'כן. היא מונה כל מסך ב־HDMI, ‏DisplayPort או USB-C ושולחת פקודות בהירות DDC/CI (מותאמות לטווח האמיתי של כל מסך), ובנוסף למסכי מחשב נייד דרך WMI.',
    'q4.q': 'איך היא עולה עם Windows?', 'q4.a': 'אם הופעל בהגדרות, היא נרשמת תחת <code>HKCU\\…\\CurrentVersion\\Run</code> עם הדגל <code>--minimized</code> ועולה בשקט לסרגל המשימות. אפשר לכבות זאת בכל עת.',
    'q5.q': 'האם היא מתחברת לאינטרנט?', 'q5.a': 'לא עבור שום דבר שהיא עושה ביום־יום. הפעילות היחידה ברשת היא בדיקת העדכון וההורדה מ־GitHub — כשלוחצים <em>בדיקת עדכונים</em>, או אם אישרתם בדיקה אוטומטית (כבויה כברירת מחדל ב־v1.1.0). אין טלמטריה.',
    'q6.q': 'האם היא משנה את הגדרות Windows שלי?', 'q6.a': 'היא עוברת בין תכניות הספק של Windows וקובעת בהן ערכי מעבד, מצב קו PCIe וכיבוי מסך, וכן בהירות מסך. <strong>יציאה ושחזור</strong> בהגדרות מחזיר ל־Balanced ומשחזר את הבהירות.',
    'q7.q': 'האם היא חינמית? קוד פתוח?', 'q7.a': 'היא חינמית לשימוש, ללא פרסומות, ונתמכת בתרומות מרצון. היא תוכנה קניינית בקוד סגור, ולכן אי אפשר לקרוא את הקוד שלה — ובשל כך אנו מפרסמים סכומי בדיקה ומעודדים לסרוק את הקובץ בעצמכם.',
    'q8.q': 'איך מסירים אותה?', 'q8.a': 'אין מתקין. פתחו הגדרות ← <em>יציאה ושחזור הגדרות מערכת</em>, בטלו את הכיבוי המתוזמן אם הפעלתם אותו, ואז מחקו את קובץ ה־exe. כיבוי "הפעלה עם Windows" מסיר קודם את רשומת ההפעלה האוטומטית.',
    'foot.tag': 'אופטימיזציית אנרגיה וסוללה חכמה ל־Windows', 'foot.sec': 'אבטחה ואימות', 'foot.pp': 'תמיכה במפתח', 'foot.share': 'שיתוף', 'foot.stats': 'סטטיסטיקת דף',
    'foot.terms': 'תנאי שימוש ורישיון (EULA)', 'foot.priv': 'מדיניות פרטיות (GDPR · CCPA · חוק הגנת הפרטיות)', 'foot.cookie': 'הודעת עוגיות ואחסון',
    'legal.h': 'הודעה משפטית, כתב ויתור על אחריות והגבלת אחריות',
    'legal.p1': 'EcoPower Suite מסופקת במצבה <strong>"כפי שהיא" ו"כפי שזמינה" (AS-IS)</strong>, ללא אחריות מכל סוג, מפורשת או משתמעת. כל נתוני הקוט״ש, ההספק, ה־CO₂ והעלות הם הערכות מדומות למטרות מודעות בלבד; תעריפי חשמל ויעילות חומרה בפועל משתנים מאוד.',
    'legal.p2': 'במידה המרבית המותרת בדין בארצות הברית, באיחוד האירופי ובישראל, היוצר והמפיצים מתנערים מכל אחריות לנזק ישיר, עקיף או תוצאתי, לרבות תקלת חומרה, הבהוב מסך, מצערת תרמית, אובדן נתונים, כיבוי מערכת או פערים בחשבון החשמל. השימוש בתכניות הספק ובעמעום DDC/CI הוא על אחריותכם הבלעדית.',
    'legal.p3': 'כפוף לדיני מדינת ישראל (סמכות שיפוט ייחודית: תל אביב־יפו). Windows, ‏Intel, ‏AMD, ‏NVIDIA, ‏Qualcomm, ‏Xbox, ‏PlayStation וסימנים אחרים שייכים לבעליהם. EcoPower Suite עצמאית ואינה קשורה ל־Microsoft או מאושרת על ידה.',
    'foot.copy': '© 2026 זיו שבת. כל הזכויות שמורות. תוכנה קניינית חינמית, שנבנתה מתוך הקפדה על פרטיות.',
    'st.title': 'סטטיסטיקת דף — בדפדפן זה בלבד', 'st.sub': 'מונים אנונימיים השמורים ב־localStorage שלכם. שום דבר לא נשלח לשום מקום.',
    'st.gh': 'הורדות GitHub', 'st.clicks': 'לחיצות הורדה', 'st.visits': 'ביקורים', 'st.conv': 'לחיצות / ביקורים', 'st.ref': 'מפנים', 'st.dev': 'מכשיר',
    'st.sim': 'שימושי סימולטור', 'st.calc': 'שימושי מחשבון', 'st.share': 'לחיצות שיתוף', 'st.hash': 'העתקות hash',
    'st.export': 'ייצוא JSON', 'st.sync': 'סנכרון מספר הורדות', 'st.reset': 'ניקוי / איפוס נתונים',
    'meta.title': 'EcoPower Suite — אופטימיזציית אנרגיה וחומרה חכמה ל־Windows',
    'meta.desc': 'כלי Windows חינמי שמצמצם את צריכת החשמל של המחשב עד 40%: מצבי הספק חכמים, עמעום מסכים מרובים ב־DDC/CI, איזון סוללה בנייד, הגנת סרק מודעת AI וכיבוי מתוזמן.'
  };

  /* Dynamic (script-rendered) strings */
  var DYN = {
    en: {
      hours1: '1 hour / day', hoursN: '{n} hours / day', month: '~{c}{v} / month', kwh: '{n} kWh', trees: '~{n} trees',
      detail: 'Saving ~{e}W in Eco • ~{s}W overnight', display1: '1 display (+{w}W Eco)', displayN: '{n} displays (+{w}W Eco)',
      rigEco: 'Eco', copied: '✓ Copied!', copyHash: 'Copy hash', copyCmd: 'Copy command', cmdCopied: '✓ Command copied!', copyLink: 'Copy link', linkCopied: '✓ Link copied!',
      baseline: 'Baseline (0% saved)', vs: '−{p}% vs Max Boost',
      eco: 'ECO SAVER ACTIVE', ecoAuto: 'ECO · AUTO IDLE', bal: 'BALANCED MODE', perf: 'MAX PERFORMANCE',
      d_eco: '🌿 ECO SAVER: screen dimmed • CPU capped at 30% • PCIe ASPM max savings (GPU / SSD idle sleep).',
      d_bal: '⚖️ BALANCED: screen 100% • dynamic CPU scaling — the perfect everyday balance.',
      d_perf: '⚡ MAX PERFORMANCE: screen 100% • full CPU turbo boost unlocked for heavy workloads.',
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
      d_eco: '🌿 ECO SAVER: מסך מעומעם • מעבד מוגבל ל־30% • PCIe ASPM בחיסכון מרבי (שינה בסרק ל־GPU ול־SSD).',
      d_bal: '⚖️ BALANCED: מסך 100% • סקיילינג דינמי של המעבד — האיזון המושלם ליום־יום.',
      d_perf: '⚡ MAX PERFORMANCE: מסך 100% • טורבו מלא של המעבד לעומסים כבדים.',
      idle: 'סרק {a} / 15:00', idleReady: 'עובר ל־Eco אחרי חוסר פעילות וחוזר כשחוזרים.', idleCount: 'סופר חוסר פעילות…',
      idleEco: 'סרק אוטומטי פעיל — הזיזו את העכבר כדי לשחזר את המצב הקודם.', simIdle: 'הדמיית סרק', simWake: 'הזזת עכבר (התעוררות)',
      shieldOn: 'ניטור שמע / וידאו / שלט / AI', rigs: { regular: 'משרדי • בסיס 35W', mid: 'תחנת עבודה • בסיס 75W', great: 'גיימינג • בסיס 120W', ultra: 'קצה עליון • בסיס 180W' }
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
    var lbl = $('#langLbl'); if (lbl) lbl.textContent = l === 'he' ? 'EN' : 'עב';
    var lb = $('#btnLang'); if (lb) lb.setAttribute('aria-label', l === 'he' ? 'Switch to English' : 'מעבר לעברית');
    renderSim(); calculateSavings(true); resetCopyLabels();
    document.dispatchEvent(new Event('eco:lang'));
  }
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
  var SIM = { eco: { cpu: 4.5, gpu: 5, base: 5, bright: 10 }, balanced: { cpu: 12.4, gpu: 5, base: 5, bright: 100 }, perf: { cpu: 42, gpu: 8, base: 5, bright: 100 } };
  var BASELINE_W = 95; /* Max Performance @ 100% brightness */
  var sim = { mode: 'balanced', bright: 100, auto: false, prev: 'balanced', idleTimer: null, idleSec: 0, idleState: 'ready' };
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
