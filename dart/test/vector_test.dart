import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:slavia_shared/sinclair.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('sinclair vectors match @slavia/shared', () async {
    final raw = await rootBundle.loadString(
      'packages/slavia_shared/assets/test-vectors/sinclair.json',
    );
    final doc = jsonDecode(raw) as Map<String, dynamic>;
    final cases = doc['cases'] as List<dynamic>;

    for (final item in cases) {
      final c = item as Map<String, dynamic>;
      final gender = c['gender'] == 'female' ? SinclairGender.female : SinclairGender.male;
      final bw = (c['bodyweight'] as num).toDouble();
      final total = (c['total'] as num).toDouble();

      if (c.containsKey('expectedCoefficient')) {
        final coef = SinclairCalculator.calculateCoefficient(bw, gender);
        if (c['expectedCoefficient'] == null) {
          expect(coef.isNaN, isTrue);
        } else {
          expect(coef, closeTo((c['expectedCoefficient'] as num).toDouble(), 0.00001));
        }
      }

      if (c.containsKey('expectedTotal')) {
        final result = SinclairCalculator.calculateTotal(total, bw, gender);
        if (c['expectedTotal'] == null) {
          expect(result.isNaN, isTrue);
        } else {
          expect(result, closeTo((c['expectedTotal'] as num).toDouble(), 0.00001));
        }
      }
    }
  });
}
