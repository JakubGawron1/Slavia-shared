import 'dart:convert';

import 'package:flutter/services.dart';

/// Ładuje katalogi JSON zsynchronizowane z `Slavia-shared/data/`.
class SlaviaCatalogs {
  SlaviaCatalogs._();

  static Map<String, dynamic>? _athleteBadges;
  static Map<String, dynamic>? _themePresets;
  static Map<String, dynamic>? _pzpcClasses;
  static Map<String, dynamic>? _brandDefaults;
  static Map<String, dynamic>? _weightliftingExercises;

  static Future<void> ensureLoaded() async {
    await Future.wait([
      athleteBadges(),
      themePresets(),
      pzpcWeightClasses(),
      brandDefaults(),
      weightliftingExercises(),
    ]);
  }

  static Future<Map<String, dynamic>> athleteBadges() async {
    return _athleteBadges ??= await _loadJson('packages/slavia_shared/assets/athlete-badges.json');
  }

  static Future<Map<String, dynamic>> themePresets() async {
    return _themePresets ??= await _loadJson('packages/slavia_shared/assets/theme-presets.json');
  }

  static Future<Map<String, dynamic>> pzpcWeightClasses() async {
    return _pzpcClasses ??= await _loadJson('packages/slavia_shared/assets/pzpc-weight-classes.json');
  }

  static Future<Map<String, dynamic>> brandDefaults() async {
    return _brandDefaults ??= await _loadJson('packages/slavia_shared/assets/brand-defaults.json');
  }

  static Future<Map<String, dynamic>> weightliftingExercises() async {
    return _weightliftingExercises ??=
        await _loadJson('packages/slavia_shared/assets/weightlifting-exercises.json');
  }

  static Future<Map<String, dynamic>> _loadJson(String assetPath) async {
    final raw = await rootBundle.loadString(assetPath);
    return jsonDecode(raw) as Map<String, dynamic>;
  }
}
